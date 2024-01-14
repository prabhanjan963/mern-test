
export default function Update() {
  return (
    <>
      <div className='w-full h-screen flex justify-center items-center text-center'>
        <form className='w-96 h-96 flex flex-col items-center bg-black rounded-md p-12'>
          <img src="vite.svg" alt="Profile" className="w-36 h-auto rounded-full -mt-4"/>
          <input 
          className='w-full border-b-2 rounded-full mt-3 p-1 outline-none'
          type="text" placeholder='Email' name='email'/>
          <input 
          className='w-full border-b-2 rounded-full mt-3 p-1 outline-none'
          type="text" placeholder='Password' name='password'/>
          <button
          className='w-full border-2 rounded-full mt-6 p-1 text-blue-600 bg-white'>UPDATE</button>
        </form>
      </div>
    </>
  )
}
