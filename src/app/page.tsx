import { Sidebar } from "@/components/studio/sidebar";
import { StudioComposer } from "@/components/studio/studio-composer";

export default function Home() {
  return (
    <div className="studio-grid-bg min-h-screen">
      <div className="grid min-h-screen lg:grid-cols-[272px_minmax(0,1fr)] xl:grid-cols-[286px_minmax(0,1fr)]">
        <Sidebar />
        <main className="min-w-0 px-5 py-10 sm:px-8 lg:px-12 lg:py-14 xl:px-16">
          <div className="mx-auto flex w-full max-w-[1060px] flex-col gap-8">
            <header className="flex flex-col gap-4">
              <h1 className="max-w-[980px] text-[38px] font-black leading-[1.06] tracking-[-0.02em] text-foreground sm:text-[46px] lg:text-[50px]">
                Pet Product Listing Image Studio
              </h1>
              <p className="max-w-[820px] text-[17px] font-medium leading-7 text-muted-foreground sm:text-[19px]">
                Create polished marketplace images for pet products with a focused AI workflow.
              </p>
            </header>

            <StudioComposer />
          </div>
        </main>
      </div>
    </div>
  );
}
