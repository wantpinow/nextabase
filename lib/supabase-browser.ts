import { createClientComponentClient } from "@supabase/auth-helpers-nextjs"

import { Database } from "@/types/database"

const supabase = createClientComponentClient<Database>()

export default supabase
