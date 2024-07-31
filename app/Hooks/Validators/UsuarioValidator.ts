import { z } from "zod";

const exemple = "@sys.input";
const sysInputSchema = z.string().regex(/^\s*@sys\.input\s*$/);
const sysInputInclude = z.string().includes(exemple);

export function validateSysInput(text: string) {
  const result = sysInputSchema.safeParse(text);
  return result.success;
}

export function IncluedeSysInput(text: string) {
  try {
    const result = sysInputInclude.safeParse(text);
    // console.log(result.success);

    if (result.success) {
      return true;
    } else {
      return false;
    }
  } catch (err) {
    // console.log(err);
    return false;
  }
}
