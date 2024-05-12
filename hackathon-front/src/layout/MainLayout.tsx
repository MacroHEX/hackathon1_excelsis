import {ReactNode} from "react";
import {Header} from "@/layout/Header.tsx";

interface Props {
  children?: ReactNode;
}

export const MainLayout = ({children}: Props) => {
  return (
    <div className="flex">
      <div className="min-h-[100dvh] bg-neutral-100 w-full">
        <Header/>
        <div className="flex gap-x-5">
          <div className="flex flex-col flex-1 justify-center items-center">{children}</div>
        </div>
      </div>
    </div>
  );
};