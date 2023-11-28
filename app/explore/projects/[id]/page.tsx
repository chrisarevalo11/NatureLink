import { formValuesTypes } from "@/app/create/page";
import Donate from "@/components/ProjectPage/Donate";
import Information from "@/components/ProjectPage/Information";

export default function Page({ params }: { params: { id: string } }) {
  const { id } = params;
  const test: formValuesTypes = {
    projectName: "Project Name",
    bannerImage:
      "https://pbs.twimg.com/media/F_KOERzXkAAaXFC?format=jpg&name=small",
    logo: "https://pbs.twimg.com/profile_images/1494316842503925764/eJ-0xwBV_400x400.jpg",
    link: "https://www.google.com",
    description:
      "lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsumlorem ipsum ",
    amount: 18000,
    startDate: "2024-01-01",
    endDate: "2022-02-01",
    scopeTags: "tag1, tag2, tag3",
    contributors: "0x12e3e1, Juan, Rookie",
  };

  return (
    <section className="w-full grid md:grid-cols-2 rounded-xl mt-2">
      <Information project={test} />
      <div className="flex flex-col justify-center rounded-br-xl rounded-bl-xl md:rounded-bl-none py-4 px-5 pxmd:rounded-tr-xl bg-slate-950">
        <Donate />
      </div>
    </section>
  );
}
