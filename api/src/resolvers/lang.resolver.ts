import { Arg, Field, InputType, Mutation, Query, Resolver } from "type-graphql";
import { Lang } from "../entities/Lang.entity";
import { BadRequestError } from "../errors/BadRequestError.error";
import { NotFoundError } from "../errors/NotFoundError.error";

@InputType()
class UpdateLangInput implements Partial<Lang> {
  @Field()
  id: number

  @Field()
  name: string
}

@Resolver(Lang)
export default class LangResolver {

  @Query(() => [Lang])
  async getLangs() {
    const langs = await Lang.find();
    return langs;
  }

  @Query(() => Lang)
  async getLang(@Arg("id", () => Number) id: number) {
    const lang = await Lang.findOne({
      where: { id }
    });

    if (!lang) {
      throw new NotFoundError();
    };

    return lang;
  }

  @Mutation(() => Lang)
  async createLang(@Arg("name", () => String) name: string) {
    const existingLang = await Lang.findOne({
      where: { name }
    })

    if (existingLang) {
      throw new BadRequestError(`Lang name ${name} already exists`);
    }

    const newLang = new Lang();
    newLang.name = name;
    await newLang.save();

    const foundLang = await Lang.findOneOrFail({
      where: { name }
    });

    return foundLang;
  }

  @Mutation(() => Lang)
  async deleteLang(@Arg("id", () => Number) id: number) {
    const foundLang = await Lang.findOneOrFail({
      where: { id }
    })

    const langID = foundLang.id;

    await foundLang.remove();

    return { id: langID };
  }

  @Mutation(() => Lang)
  async updateLang(@Arg("body") newDataLang: UpdateLangInput) {
    const { id, name } = newDataLang;

    const foundLang = await Lang.findOne({
      where: { id }
    });

    if (!foundLang) {
      throw new NotFoundError();
    }

    name && (foundLang.name = name);

    await foundLang.save();

    const lang = await Lang.findOneOrFail({
      where: { id }
    });

    return lang;
  }
}