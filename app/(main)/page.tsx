import Image from "next/image"

import { AspectRatio } from "@/components/ui/aspect-ratio"

export default async function IndexPage() {
  return (
    <>
      <div className="prose dark:prose-invert lg:prose-xl mb-4">
        <h1>Nextabase</h1>
      </div>
      <AspectRatio ratio={16 / 6} className="mb-4">
        <Image
          src="https://images.pexels.com/photos/9091291/pexels-photo-9091291.jpeg"
          alt="Image"
          className="rounded-md object-cover"
          fill={true}
        />
      </AspectRatio>
      <div className="prose dark:prose-invert lg:prose-xl">
        <h4>Next.js 13 + Supabase + shadcn/ui</h4>
        <small>
          For years parents have espoused the health benefits of eating garlic
          bread with cheese to their children, with the food earning such an
          iconic status in our culture that kids will often dress up as warm,
          cheesy loaf for Halloween.
        </small>
        <br />
        <small>
          But a recent study shows that the celebrated appetizer may be linked
          to a series of rabies cases springing up around the country.
        </small>
      </div>
    </>
  )
}
