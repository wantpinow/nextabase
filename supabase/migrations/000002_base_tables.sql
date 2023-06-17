------ TODO ------
--- table
CREATE TABLE public.todo (
    id uuid DEFAULT gen_random_uuid() NOT NULL,
    user_id uuid NOT NULL,
    name character varying NOT NULL,
    public boolean DEFAULT false NOT NULL,
    complete boolean DEFAULT false NOT NULL,
    created_at timestamp with time zone DEFAULT now() NOT NULL,
    updated_at timestamp with time zone DEFAULT now() NOT NULL
);

--- owner
ALTER TABLE public.todo OWNER TO postgres;

--- grant permissions
GRANT ALL ON TABLE public.todo TO anon;
GRANT ALL ON TABLE public.todo TO authenticated;
GRANT ALL ON TABLE public.todo TO service_role;

--- primary key
ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_pkey PRIMARY KEY (id);

--- foreign key(s)
ALTER TABLE ONLY public.todo
    ADD CONSTRAINT todo_user_id_fkey FOREIGN KEY (user_id) REFERENCES auth.users(id) ON DELETE CASCADE;

--- row level security
ALTER TABLE public.todo ENABLE ROW LEVEL SECURITY;

CREATE POLICY "todo_select_user_own" --- users can only select their own todos
    ON todo FOR SELECT
    USING ( auth.uid() = user_id );
CREATE POLICY "todo_insert_user_own" --- users can only insert their own todos
    ON todo FOR INSERT
    WITH CHECK ( 
        auth.uid() = user_id AND --- user is owner
        created_at=now() AND --- don't allow changing protected fields
        updated_at=now() 
    );
CREATE POLICY "todo_update_user_own" --- users can only update their own todos
    ON todo FOR UPDATE
    USING ( 
        auth.uid() = user_id --- user is owner
        AND 
        EXISTS(SELECT 1 FROM todo AS d WHERE --- don't allow changing protected fields
            d.id=todo.id AND
            d.user_id=todo.user_id AND
            d.created_at=todo.created_at AND
            d.updated_at=todo.updated_at
        )
    );
CREATE POLICY "todo_delete_user_own" --- users can only delete their own todos
    ON todo FOR DELETE
    USING ( auth.uid() = user_id );

CREATE POLICY "todo_select_public" --- users can select public todos
    ON todo FOR SELECT
    USING ( public = true );

CREATE POLICY "todo_admin_select_all"
    ON todo FOR SELECT
    USING (is_claims_admin() = true);