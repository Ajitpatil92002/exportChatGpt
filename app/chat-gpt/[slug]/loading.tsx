import { Skeleton } from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="prompt_layout mt-5">
      <div className="prompt_card">
        <div className="wrapper flex-col justify-start md:flex md:flex-row md:items-center md:gap-5">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="content my-3 ml-5 self-end md:ml-0 md:self-start">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>

        <div className="wrapper mt-8 flex-col justify-start md:flex md:flex-row md:items-center md:gap-5">
          <div className="answer content my-3 ml-5 self-end md:ml-0 md:self-start">
            <Skeleton className="h-40 w-[500px]" />
          </div>
        </div>
      </div>
      <div className="prompt_card">
        <div className="wrapper flex-col justify-start md:flex md:flex-row md:items-center md:gap-5">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="content my-3 ml-5 self-end md:ml-0 md:self-start">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>

        <div className="wrapper mt-8 flex-col justify-start md:flex md:flex-row md:items-center md:gap-5">
          <div className="answer content my-3 ml-5 self-end md:ml-0 md:self-start">
            <Skeleton className="h-40 w-[500px]" />
          </div>
        </div>
      </div>
      <div className="prompt_card">
        <div className="wrapper flex-col justify-start md:flex md:flex-row md:items-center md:gap-5">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="content my-3 ml-5 self-end md:ml-0 md:self-start">
            <Skeleton className="h-4 w-[250px]" />
          </div>
        </div>

        <div className="wrapper mt-8 flex-col justify-start md:flex md:flex-row md:items-center md:gap-5">
          <div className="answer content my-3 ml-5 self-end md:ml-0 md:self-start">
            <Skeleton className="h-40 w-[500px]" />
          </div>
        </div>
      </div>
    </div>
  )
}
