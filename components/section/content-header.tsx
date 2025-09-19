import Image from "next/image";

interface SectionProps {
  image: string | null;
  name: string;
  count: number;
  page: "lyrics" | "poems";
  Action?: React.ReactNode;
}

export default function ContentHeader({
  image,
  name,
  count,
  page,
  Action,
}: SectionProps) {
  return (
    <section className="flex p-4 rounded-md bg-gray-700 gap-4 md:gap-8">
      <div className="relative w-20 h-20 md:w-48 md:h-48  flex-shrink-0">
        <div className="w-full h-full overflow-hidden shadow-lg">
          {image ? (
            <Image
              src={image || "/placeholder.svg"}
              alt={name}
              fill
              className="object-cover rounded-md transition-transform duration-300 hover:scale-105"
              sizes="(max-width: 768px) 192px, 224px"
            />
          ) : (
            <div className="bg-slate-200 rounded-md w-full h-full flex items-center justify-center">
              <span className="text-slate-500 font-medium">No Image</span>
            </div>
          )}
        </div>
      </div>

      <div className="flex-1  md:text-left">
        <div className="flex items-center gap-4 justify-between md:mb-4">
          <h1 className="text-lg  md:text-5xl font-bold text-background  ">
            {name}
          </h1>
          {Action && <div>{Action}</div>} {/* 👈 render it */}
        </div>
        <p className=" text-gray-200 font-medium">
          Total {page}:{" "}
          <span className="text-slate-200 font-semibold">{count}</span>
        </p>
      </div>
    </section>
  );
}
