import React from 'react'

function PriceDisplayCard2({data}) {
  console.log(data,"fwef");
  return (
    <div class="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
<svg  height="64px" width="30px" viewBox="0 0 24 25" fill="none" xmlns="http://www.w3.org/2000/svg">
  <path fillRule="evenodd" clipRule="evenodd" d="M15.3258 19.7601V23.7501H5.09183V17.3101C4.11597 16.4395 3.33728 15.3705 2.80784 14.1747C2.2784 12.9789 2.01042 11.6838 2.02183 10.3761C2.06683 4.20012 8.27883 0.013121 14.2568 1.58112C15.3885 1.88136 16.4313 2.44938 17.2974 3.23728C18.1634 4.02517 18.8272 5.00981 19.2328 6.10812C19.3538 6.37476 19.4159 6.66433 19.4148 6.95712V9.13612C19.4148 9.13612 20.8828 11.8861 21.8878 14.1231C21.9576 14.2788 21.9873 14.4494 21.9742 14.6195C21.9611 14.7896 21.9057 14.9537 21.8129 15.0968C21.7202 15.24 21.5931 15.3577 21.4432 15.4391C21.2933 15.5206 21.1254 15.5632 20.9548 15.5631H19.4188V18.4301C19.419 18.6048 19.3847 18.7778 19.3179 18.9392C19.2511 19.1007 19.1531 19.2473 19.0296 19.3709C18.9061 19.4944 18.7594 19.5924 18.598 19.6591C18.4365 19.7259 18.2635 19.7603 18.0888 19.7601H15.3258ZM10.522 4.59106C10.1078 4.59106 9.77197 4.92685 9.77197 5.34106C9.77197 5.65324 9.9627 5.92087 10.234 6.03378V6.75297C9.81618 6.84347 9.42598 7.00802 9.07779 7.23219L8.56925 6.72365C8.68146 6.4519 8.62713 6.12759 8.40628 5.90674C8.11339 5.61385 7.63852 5.61385 7.34562 5.90674L7.02078 6.23159L7.01865 6.23371L7.01653 6.23584L6.69162 6.56074C6.39873 6.85364 6.39873 7.32851 6.69162 7.6214C6.9125 7.84227 7.23685 7.89659 7.50862 7.78434L8.01713 8.29285C7.79296 8.64104 7.62841 9.03124 7.53791 9.44904H6.81908C6.7064 9.17725 6.43851 8.98608 6.12598 8.98608C5.71176 8.98608 5.37598 9.32187 5.37598 9.73608V10.199V10.6621C5.37598 11.0763 5.71176 11.4121 6.12598 11.4121C6.43855 11.4121 6.70646 11.2209 6.81912 10.949H7.53791C7.62841 11.3668 7.79297 11.757 8.01714 12.1052L7.50858 12.6138C7.23682 12.5016 6.91249 12.5559 6.69162 12.7767C6.39873 13.0696 6.39873 13.5445 6.69162 13.8374L7.34562 14.4914C7.63852 14.7843 8.11339 14.7843 8.40628 14.4914C8.62714 14.2705 8.68146 13.9462 8.56924 13.6745L9.0778 13.1659C9.42599 13.3901 9.81619 13.5546 10.234 13.6451V14.3644C9.9627 14.4773 9.77197 14.7449 9.77197 15.0571C9.77197 15.4713 10.1078 15.8071 10.522 15.8071H11.447C11.8612 15.8071 12.197 15.4713 12.197 15.0571C12.197 14.7445 12.0058 14.4766 11.734 14.3639V13.6451C12.1518 13.5546 12.542 13.3901 12.8901 13.1659L13.3987 13.6744C13.2865 13.9462 13.3408 14.2705 13.5617 14.4914C13.8545 14.7843 14.3294 14.7843 14.6223 14.4914L15.2763 13.8374C15.5692 13.5445 15.5692 13.0696 15.2763 12.7767C15.0555 12.5559 14.7311 12.5016 14.4594 12.6138L13.9508 12.1052C14.175 11.757 14.3395 11.3668 14.43 10.949H15.1488C15.2615 11.2209 15.5294 11.4121 15.842 11.4121C16.2562 11.4121 16.592 11.0763 16.592 10.6621L16.592 10.199L16.592 9.73608C16.592 9.32187 16.2562 8.98608 15.842 8.98608C15.5294 8.98608 15.2616 9.17725 15.1489 9.44904H14.43C14.3395 9.03124 14.175 8.64103 13.9508 8.29284L14.4593 7.78434C14.7311 7.89659 15.0554 7.84227 15.2763 7.6214C15.5692 7.32851 15.5692 6.85364 15.2763 6.56074L14.9522 6.23667L14.9493 6.23371L14.9463 6.23076L14.6223 5.90674C14.3294 5.61385 13.8545 5.61385 13.5617 5.90674C13.3408 6.12759 13.2865 6.45191 13.3987 6.72366L12.8902 7.23219C12.542 7.00802 12.1518 6.84347 11.734 6.75297V6.03419C12.0058 5.92151 12.197 5.65362 12.197 5.34106C12.197 4.92685 11.8612 4.59106 11.447 4.59106H10.984H10.522ZM8.95798 10.199C8.95798 9.08202 9.86194 8.17614 10.9782 8.17304L10.984 8.17306L10.9897 8.17304C12.106 8.17614 13.01 9.08202 13.01 10.199C13.01 11.318 12.1029 12.225 10.984 12.225C9.86505 12.225 8.95798 11.318 8.95798 10.199Z" fill="#FF8E26" />
</svg>




      <a href="#">
        <h5 class="mb-2 text-xl font-semibold tracking-tight text-gray-900">
Total Doctors        </h5>
      </a>
      <div className="flex items-center space-x-4">
        <span className="font-semibold text-3xl">{data?.doctor_count}</span>
        <span className="font-semibold text-green-500">+{data?.currentMonthDoctorCount-data?.lastMonthDoctorCount>0?data?.currentMonthDoctorCount-data?.lastMonthDoctorCount:0}</span>
      </div>
    </div>
  )
}

export default PriceDisplayCard2