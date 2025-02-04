import React from "react";

const Hero = () => {
  return (
    <div className="hero min-h-screen bg-base-200">
    <header class="relative py-4 md:py-6">
    </header>

    <section class="relative py-12 sm:py-16 lg:pt-20 lg:pb-36">
        <div class="px-4 mx-auto sm:px-6 lg:px-8 max-w-7xl">
            <div class="grid grid-cols-1 gap-y-8 lg:items-center lg:grid-cols-2 sm:gap-y-20 xl:grid-cols-5">
                <div class="text-center xl:col-span-2 lg:text-left md:px-16 lg:px-0">
                    <div class="max-w-sm mx-auto sm:max-w-md md:max-w-full">
                        <h1 class="text-4xl font-bold leading-tight text-gray-900 sm:text-5xl sm:leading-tight lg:text-6xl lg:leading-tight font-pj">Your Parter That Listenes</h1>
                        <p>With Brainser Memorizing Was Never Easy</p>
                    </div>

                    <div class="mt-8 sm:flex sm:items-center sm:justify-center lg:justify-start sm:space-x-5 lg:mt-12">
                        <a
                            href="#"
                            title=""
                            class="inline-flex items-center px-8 py-4 text-lg font-bold text-white transition-all duration-200 bg-gray-900 border border-transparent rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 font-pj justif-center hover:bg-gray-600"
                            role="button"
                        >
                            How It Works
                        </a>

                        <a
                            href="#"
                            title=""
                            class="inline-flex items-center px-4 py-4 mt-4 text-lg font-bold transition-all duration-200 bg-transparent border border-transparent sm:mt-0 font-pj justif-center rounded-xl focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-300 hover:bg-gray-200 focus:bg-gray-200"
                            role="button"
                        >
                            <svg class="w-5 h-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2.5" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                            </svg>
                            Try For Free
                        </a>
                    </div>
                </div>

                <div class="xl:col-span-3">
                    <img class="w-full mx-auto scale-110" src="https://d33wubrfki0l68.cloudfront.net/29c501c64b21014b3f2e225abe02fe31fd8f3a5c/f866d/images/hero/3/illustration.png" alt="" />
                </div>
            </div>
        </div>
    </section>

    </div>
  );
};
export default Hero;
