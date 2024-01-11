import { Prisma } from "@prisma/client";

import { prisma } from "@formbricks/database";
import { TAccount, TAccountInput, ZAccountInput } from "@formbricks/types/account";
import { DatabaseError } from "@formbricks/types/errors";

import { validateInputs } from "../utils/validate";

export const createAccount = async (accountData: TAccountInput): Promise<TAccount> => {
  validateInputs([accountData, ZAccountInput]);

  try {
    const account = await prisma.account.create({
      data: accountData,
    });
    return account;
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError) {
      throw new DatabaseError(error.message);
    }

    throw error;
  }
};
