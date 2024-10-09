import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Status } from "../entities/Status.entity";
import { BadRequestError } from "../errors/BadRequestError.error";
import { NotFoundError } from "../errors/NotFoundError.error";

@InputType()
class UpdateStatusInput implements Partial<Status> {
  @Field()
  id: number

  @Field()
  name: string
}

@Resolver(Status)
export default class StatusResolver {

  @Query(() => [Status])
  async getStatuses() {
    const statuses = await Status.find({
      relations: {
        repos: true
      }
    });
    return statuses;
  }

  @Query(() => Status)
  async getStatus(@Arg("id", () => Number) id: number) {
    const status = await Status.findOne({
      where: { id }
    });

    if (!status) {
      throw new NotFoundError();
    }

    return status;
  }

  @Mutation(() => Status)
  async createStatus(@Arg("name", () => String) name: string) {
    const existingStatus = await Status.findOne({
      where: { name }
    });

    if (existingStatus) {
      throw new BadRequestError(`Status ${name} already exists.`)
    }

    const newStatus = new Status();
    newStatus.name = name;

    await newStatus.save();

    const foundStatus = await Status.findOneOrFail({
      where: { name }
    })

    return foundStatus;
  }

  @Mutation(() => Status)
  async deleteStatus(@Arg("id", () => Number) id: number) {
    const foundStatus = await Status.findOne({
      where: { id }
    });

    if (!foundStatus) {
      throw new NotFoundError();
    }

    const statusID = foundStatus.id;

    foundStatus.remove();

    return { id: statusID };
  }

  @Mutation(() => Status)
  async updateStatus(@Arg("body") newDataStatus: UpdateStatusInput) {
    const { id, name } = newDataStatus;

    const foundStatus = await Status.findOne({
      where: { id }
    });

    if (!foundStatus) {
      throw new NotFoundError();
    }

    name && (foundStatus.name = name);

    await foundStatus.save();

    const status = await Status.findOneOrFail({
      where: { id }
    });

    return status;
  }
}