<template>
	<!--Nav-->
	<nav class="bg-gray-900 p-4 mt-0 w-full">
        <div class="container mx-auto flex items-center">
		    <div class="flex text-white font-extrabold">
				<NuxtLink class="flex text-white text-base no-underline hover:text-white hover:no-underline" to="/"> 
					<span class="hidden w-0 md:w-auto md:block pl-1">Gabriel Almeida</span>
				</NuxtLink>
            </div>
			<div class="flex pl-4 text-sm">
				<ul class="list-reset flex justify-between flex-1 md:flex-none items-center">
				  <li class="mr-2">
                    <NuxtLink class="inline-block py-2 px-2 text-white no-underline" to="/">
                        Home
                    </NuxtLink>
                    <NuxtLink class="inline-block py-2 px-2 text-white no-underline" to="/summarizer">
                        Summarizer
                    </NuxtLink>
				  </li>
				</ul>
			</div>
        </div>
	</nav>
</template>