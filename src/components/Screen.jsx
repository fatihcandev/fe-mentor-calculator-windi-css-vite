const Screen = ({ input }) => {
  return (
    <div
      h="22"
      p="x-6.25"
      m="b-6"
      display="flex"
      flex="row-reverse"
      align="items-center"
      text="white 3xl"
      bg="bgTertiary"
      rounded="[14px]"
      md="px-8.75 text-5xl h-32"
      overflow="x-auto"
      role="screen"
    >
      {input}
    </div>
  )
}

export default Screen
