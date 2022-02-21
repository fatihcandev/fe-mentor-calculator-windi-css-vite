const Screen = ({ input }) => {
  return (
    <div
      h="22"
      p="x-6.25"
      m="b-6"
      display="flex"
      align="items-center"
      justify="end"
      text="white 3xl"
      bg="bgTertiary"
      rounded="[14px]"
      md="px-8.75 text-5xl h-32"
      role="screen"
    >
      {input}
    </div>
  )
}

export default Screen
