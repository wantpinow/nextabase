import type { Session as _Session, User as _User } from "@supabase/supabase-js"

import type { Database as _Database } from "@/types/database"
import type { ModifyDeep } from "@/types/utils"

// declare user and app metadata types
interface UserMetadata {
  first_name?: string
  last_name?: string
}
interface AppMetadata {
  provider?: string
  providers?: string[]
  claims_admin?: boolean
}

// extend supabase user type with user and app metadata
export interface User extends Omit<_User, "user_metadata" | "app_metadata"> {
  user_metadata: UserMetadata
  app_metadata: AppMetadata
}

// extend supabase session type with new user type
export interface Session extends Omit<_Session, "user"> {
  user: User
}

// override existing supabase database types
interface DatabaseOverride {
  public: {
    CompositeTypes: {
      auth_user: {
        raw_user_meta_data: UserMetadata
        raw_app_meta_data: AppMetadata
      }
    }
  }
}
export interface Database extends ModifyDeep<_Database, DatabaseOverride> {}

// export database types
export type Todo = Database["public"]["Tables"]["todo"]["Row"]
