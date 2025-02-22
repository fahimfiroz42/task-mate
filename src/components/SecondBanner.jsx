

const SecondBanner = () => {
    return (
        <div
        className="relative hero min-h-[calc(100vh-65px)] "
       style={{
          backgroundImage: "url(https://i.ibb.co.com/9HjBPD0z/34544.jpg)",
        }}>
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-2xl">
            <h1 className="mb-5 text-5xl font-bold">Welcome to TaskMate</h1>
            <p className="mb-5">
              TaskMate is a task management app that helps you stay organized and
              focused on your goals.
            </p>

            
          </div>
        </div>
        
        

      </div>
    );
};

export default SecondBanner;