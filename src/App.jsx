import Header from './components/Header'

function App() {
  return (
    <div display="flex" bg="bgPrimary" h="100vh" p="[30px] md:(px-0 py-[96px])">
      <div w="full max-[540px]" m="x-auto">
        <Header />
      </div>
    </div>
  )
}

export default App
