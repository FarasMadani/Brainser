import React from "react";
import Background from "../App/Background"

const Hero = () => {
  return (
    <>
    <Background />
        <div class="px-4 py-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div class="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
                <div class="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
                    <div class="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                        <h1 class="text-4xl font-bold leading-tight text-black sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">Your Parter That Listenes</h1>
                        <p>With Brainser Memorizing Was Never Easy</p>
                    </div>

                    <div class="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
                        <a
                            href="#"
                            title=""
                            class="btn btn-lg hover:bg-black hover:text-white"
                            role="button"
                        >
                            How It Works
                        </a>

                    </div>
                </div>
                <div class="xl:col-span-3">
                    <img class="w-full mx-auto scale-110 left-4" src="https://d33wubrfki0l68.cloudfront.net/29c501c64b21014b3f2e225abe02fe31fd8f3a5c/f866d/images/hero/3/illustration.png" alt="" />
                </div>
            </div>
        </div>
    </>
  );
};
export default Hero;
