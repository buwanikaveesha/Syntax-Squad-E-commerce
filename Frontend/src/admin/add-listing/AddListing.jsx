import React from "react";
import AdminHeader from "../AdminHeader";
import carDetails from "../../Shared/carDetails.json";
import InputField from "./components/InputField";
import DropdownField from "./components/DropdownField";
import TextAreaField from "./components/TextAreaField";
import { Separator } from "@/components/ui/separator";
import features from '../../Shared/features.json';
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";

const AddListing = () => {
  return (
    <div>
      <AdminHeader title={"Add Listing"} />
      <div className="px-10 md:px-20 my-10">
        <h2 className="font-bold text-4xl">Add New Listing</h2>
        <form className="p-10 border rounded-xl mt-10">
          {/* Car Details  */}
          <div>
            <h2 className="font-medium text-xl mb-6">Car Details</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {carDetails.carDetails.map((item, index) => (
                <div key={index}>
                  <label className="text-sm flex gap-2 items-center mb-1">
                    {item?.label}{" "}
                    {item.required && <span className="text-red-500">*</span>}
                  </label>
                  {item.fieldType == "text" || item.fieldType == "number" ? (
                    <InputField item={item} />
                  ) : item.fieldType == "dropdown" ? (
                    <DropdownField item={item} />
                  ) : item.fieldType == "textarea" ? (
                    <TextAreaField item={item} />
                  ) : null}
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6"/>

          {/* Features List  */}
          <div className="">
            <h2 className='font-medium text-xl my-6'>Features</h2>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
              {features.features.map((item,index) => (
                <div key={index} className='flex gap-2 items-center'>
                  <Checkbox/> <h2>{item.label}</h2>
                </div>
              ))}
            </div>
          </div>
          <Separator className="my-6"/>
          {/* Car Images  */}
          <div className="mt-10 flex justify-end">
            <Button className="bg-red-500">Submit</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddListing;
