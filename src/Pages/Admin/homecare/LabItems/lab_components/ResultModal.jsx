import React from 'react'

function ResultModal() {
  const [showModal, setShowModal] = React.useState(false);

  return (
    <div>
      <div class="w-96 h-96 p-4 bg-white rounded-lg justify-start items-center gap-16 inline-flex">
  <div class="p-4 bg-white flex-col justify-center items-start gap-7 inline-flex">
    <div class="flex-col justify-center items-start gap-8 flex">
      <div class="flex-col justify-start items-start gap-6 flex">
        <div class="justify-start items-start gap-14 inline-flex">
          <div class="text-gray-400 text-base font-normal font-['Roboto Flex']">Name :</div>
          <div class="text-zinc-800 text-base font-normal font-['Roboto Flex']">Joel</div>
        </div>
        <div class="justify-center items-center gap-20 inline-flex">
          <div class="text-gray-400 text-base font-normal font-['Roboto Flex']">ID :</div>
          <div class="text-zinc-800 text-base font-normal font-['Roboto Flex']">8736452</div>
        </div>
        <div class="justify-start items-start gap-9 inline-flex">
          <div class="text-gray-400 text-base font-normal font-['Roboto Flex'] tracking-wide">Member :</div>
          <div class="text-zinc-800 text-base font-normal font-['Roboto Flex'] tracking-wide">1</div>
        </div>
        <div class="justify-start items-start gap-5 inline-flex">
          <div class="text-gray-400 text-base font-normal font-['Roboto Flex'] tracking-wide">Test name :</div>
          <div class="w-56 text-zinc-800 text-base font-normal font-['Roboto Flex'] tracking-wide">Comprehensive full body check up with vitamin</div>
        </div>
        <div class="justify-start items-start gap-9 inline-flex">
          <div class="text-gray-400 text-base font-normal font-['Roboto Flex'] tracking-wide">Address :</div>
          <div class="w-64 text-zinc-800 text-base font-normal font-['Roboto Flex'] leading-tight tracking-wide">18 Al Murwah Street, Ajman Al rigga, Green corner , 703, 7<br/>Mobile number: +971 502407809</div>
        </div>
        <div class="justify-center items-center gap-3.5 inline-flex">
          <div class="text-gray-400 text-base font-normal font-['Roboto Flex']">Date & Time :</div>
          <div class="text-zinc-800 text-base font-normal font-['Roboto Flex']">4:00 PM Dec 15, 2023</div>
        </div>
        <div class="justify-center items-center gap-7 inline-flex">
          <div class="text-gray-400 text-base font-normal font-['Roboto Flex']">Total price :</div>
          <div class="text-zinc-800 text-base font-normal font-['Roboto Flex']">AED 100</div>
        </div>
      </div>
      <div class="self-stretch h-48 flex-col justify-start items-start gap-4 flex">
        <div class="text-zinc-800 text-base font-normal font-['Roboto Flex']">Add result</div>
        <div class="self-stretch h-40 px-10 py-5 bg-white rounded-lg border border-zinc-700 flex-col justify-center items-center flex">
          <div class="w-8 h-8 relative"></div>
          <div class="text-zinc-800 text-base font-normal font-['Roboto']">Drag and Drop here</div>
          <div class="w-32 h-6 p-2.5 flex-col justify-center items-center gap-2.5 flex">
            <div class="text-center text-neutral-700 text-base font-normal font-['Roboto']">or</div>
          </div>
          <div class="w-32 p-2.5 bg-emerald-200 rounded justify-center items-center gap-2.5 inline-flex">
            <div class="text-zinc-800 text-base font-normal font-['Roboto']">Select file</div>
          </div>
        </div>
      </div>
    </div>
    <div class="self-stretch justify-start items-start gap-3.5 inline-flex">
      <div class="grow shrink basis-0 h-12 px-3.5 py-4 bg-emerald-200 rounded-lg justify-center items-center gap-2.5 flex">
        <button 
        onClick={() => setShowModal(false)}
        class="text-green-600 text-base font-normal ">Done</button>
      </div>
      <div class="grow shrink basis-0 h-12 px-3.5 py-4 bg-emerald-200 rounded-lg justify-center items-center gap-2.5 flex">
        <button 
        onClick={() => setShowModal(false)}
        class="text-green-600 text-base font-normal ">Cancel</button>
      </div>
    </div>
  </div>
  <div class="w-7 h-7 px-1 py-2.5 left-[384px] top-[24px] absolute bg-stone-300 bg-opacity-20 rounded-3xl justify-center items-center gap-2.5 flex">
    <div class="w-5 h-5 relative"></div>
  </div>
</div>
    </div>
  )
}

export default ResultModal
