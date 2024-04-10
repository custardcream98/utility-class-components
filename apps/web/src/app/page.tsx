import { utld } from "utility-class-components";

export default function Home() {
  return (
    <Main>
      <Box>BOX</Box>
    </Main>
  );
}

const Main = utld.main`
  flex
  min-h-screen
  min-w-screen
  flex-col
  items-center
  justify-center
`;

const Box = utld.div`
  bg-gray-100
  p-4
  rounded-md
  w-96
  text-center
  text-slate-800
`;
