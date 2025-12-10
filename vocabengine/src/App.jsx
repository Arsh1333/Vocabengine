import './App.css'

function App() {


  return (
    <>
      <div>
        {/* <h1 class="text-3xl font-bold underline bg-amber-200">Hello world!</h1>
        <button class="btn btn-primary">Button</button> */}
        <div className="join">
          <div>
            <label className="input validator join-item">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="size-4"
              >
                <path d="M21.731 2.269a2.625 2.625 0 0 0-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 0 0 0-3.712ZM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 0 0-1.32 2.214l-.8 2.685a.75.75 0 0 0 .933.933l2.685-.8a5.25 5.25 0 0 0 2.214-1.32L19.513 8.2Z" />
              </svg>

              <input type="text" placeholder="Enter your text" />
            </label>
          </div>
          <button className="btn btn-neutral join-item ml-4">Extract</button>
        </div>
      </div>
    </>
  );
}

export default App
