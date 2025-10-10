function App() {
  return (
    <div className="min-h-screen bg-[#0f1e32] p-[12px]">
      {/* White container with 15px margin on all sides */}
      <div className="w-full min-h-[705px] rounded-[30px] bg-cover bg-center bg-no-repeat relative" style={{ backgroundImage: 'url(/hero-bg.png)' }}>
        {/* Content goes here */}

        {/* Zazzy image at the bottom */}
        <img
          src="/zazzy.webp"
          alt="Zazzy"
          className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-[90%]"
        />
      </div>
    </div>
  )
}

export default App
