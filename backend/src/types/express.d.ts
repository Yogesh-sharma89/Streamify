import type { userDoc } from "../utils/generateToken.ts";

declare global{
    namespace Express{
      interface Request{
        user:userDoc
      }
    }
}