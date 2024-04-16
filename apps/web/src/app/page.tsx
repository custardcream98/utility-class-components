import { utld } from "utility-class-components";

export default function Home() {
  return (
    <Main>
      <Box>BOX</Box>
      <WithParenthesis />
      <NestedStyle />
      <NestedWithCalcStyle />
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

  gap-4
`;

const Box = utld.div`
  bg-gray-100
  p-4
  rounded-md
  w-96
  text-center
  text-slate-800
`;

const WithParenthesis = utld.div`
  bg-gray-100
  p-4
  rounded-md
  w-96
  text-center
  text-slate-800

  hover:(
    bg-red-200
    text-slate-900
  )
`;

const NestedStyle = utld.div`
  bg-gray-100
  p-4
  rounded-md
  w-96
  text-center
  text-slate-800

  hover:(
    bg-red-200
    text-slate-900

    md:(bg-blue-200)
  )
`;

const NestedWithCalcStyle = utld.div`
  bg-gray-100
  p-4
  rounded-md
  w-96
  text-center
  text-slate-800

  hover:(
    bg-red-200
    text-slate-900

    h-[calc(30vh-4rem)]
  )
`;
