import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Repo } from "../entities/Repo.entity";
import { BadRequestError } from "../errors/BadRequestError.error";
import { Status } from "../entities/Status.entity";
import { makeRandomString } from "../helpers/makeRandomString.helper";
import { NotFoundError } from "../errors/NotFoundError.error";

@InputType()
class CreateRepoInput implements Partial<Repo> {
  @Field()
  name: string

  @Field()
  isPrivate: number
}

@InputType()
class UpdateRepoInput implements Partial<Repo> {
  @Field()
  id: string

  @Field({ nullable: true })
  name?: string

  @Field({ nullable: true })
  isPrivate?: number
}

@Resolver(Repo)
export default class RepoResolver {

  @Query(() => [Repo])
  async getRepos() {
    const repos = await Repo.find({
      relations: {
        languages: true,
        status: true
      }
    });
    return repos;
  }

  @Query(() => Repo)
  async getRepo(@Arg("id", () => String) id: string) {
    const repo = await Repo.findOne({
      where: { id },
      relations: {
        status: true,
        languages: true
      }
    });

    if (!repo) {
      throw new NotFoundError();
    }

    return repo;
  }

  @Mutation(() => Repo)
  async createNewRepo(@Arg("body") newRepo: CreateRepoInput) {
    const existingRepo = await Repo.findOne({
      where: { name: newRepo.name }
    })
    
    if (existingRepo) {
      throw new BadRequestError(`Repo with name ${newRepo.name} already exists`);
    }

    const repo = new Repo();
    
    const repoID = makeRandomString(12);
    repo.id = repoID;

    repo.name = newRepo.name;

    const repoUrl = "https://github.com/NicolasSokolowski/" + newRepo.name.replace(/ /g, '');
    repo.url = repoUrl;

    const status = await Status.findOne({
      where: { id: +newRepo.isPrivate }
    })

    if (!status) {
      throw new BadRequestError(`Status with id ${newRepo.isPrivate} not found.`);
    }

    repo.status = status;

    await repo.save();

    const foundRepo = await Repo.findOneOrFail({
      where: { id: repoID },
      relations: {
        languages: true,
        status: true
      }
    })

    return foundRepo;
  }

  @Mutation(() => Repo)
  async deleteRepo(@Arg("id", () => String) id: string) {
    const foundRepo = await Repo.findOneOrFail({
      where: { id }
    })

    const repoID = foundRepo.id;

    await foundRepo.remove();

    return { id: repoID };
  }

  @Mutation(() => Repo)
  async updateRepo(@Arg("body") newDataRepo: UpdateRepoInput) {
    const { id, name, isPrivate } = newDataRepo;

    const foundRepo = await Repo.findOne({
      where: { id }
    });

    if (!foundRepo) {
      throw new NotFoundError();
    }

    const status = await Status.findOne({
      where: { id: isPrivate }
    });

    if (!status) {
      throw new NotFoundError();
    }

    name && (foundRepo.name = name);
    name && (foundRepo.url = "https://github.com/NicolasSokolowski/" + name.replace(/ /g, ''));
    isPrivate && (foundRepo.status = status);

    await foundRepo.save();

    const repo = await Repo.findOne({
      where: { id },
      relations: {
        status: true,
        languages: true
      }
    });

    return repo;
  }
}