import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import { Button } from "antd";

type InternationalFormData = {
  shipmentType: "air_cargo" | "sea_cargo";
  serviceType: "warehouse" | "drop_off";
  senderCountry: string;
  senderCity: string;
  senderState: string;
  pickUpServices: "yes" | "no" | "";
  senderFullName: string;
  senderPhone: string;
  senderAddress: string;
  whatPickingUp: string;
  otherWhatPickingUp?: string;
  senderEmail: string;
  shippingType: string;
  packageUnit: string;
  packageValue: string;
  uploadImage: FileList;
  receiverCountry: string;
  receiverCity: string;
  receiverState: string;
  receiverFullName: string;
  receiverPhone: string;
  receiverEmail: string;
  receiverAddress: string;
};

// Country → unit mapping
const COUNTRY_UNIT_MAP: Record<string, string> = {
  "United Kingdom": "KG",
  China: "CBM",
  "United States": "Pound",
};

function getUnitForCountry(country: string): string {
  return COUNTRY_UNIT_MAP[country] ?? "KG"; // default KG
}

export default function InternationalForm() {
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors },
  } = useForm<InternationalFormData>({
    defaultValues: {
      shipmentType: "air_cargo",
      serviceType: "warehouse",
      pickUpServices: "",
    },
  });

  const [countries, setCountries] = useState<string[]>([]);
  const [loadingCountries, setLoadingCountries] = useState(true);

  useEffect(() => {
    fetch("https://countriesnow.space/api/v0.1/countries/positions")
      .then((res) => res.json())
      .then((data) => {
        if (!data.error) {
          const names: string[] = data.data
            .map((c: { name: string }) => c.name)
            .sort((a: string, b: string) => a.localeCompare(b));
          setCountries(names);
        }
      })
      .catch(() => toast.error("Failed to load countries"))
      .finally(() => setLoadingCountries(false));
  }, []);

  const selectedSenderCountry = watch("senderCountry");
  const whatPickingUp = watch("whatPickingUp");
  const isUK = selectedSenderCountry === "United Kingdom";
  const packageUnit = getUnitForCountry(selectedSenderCountry);

  useEffect(() => {
    if (!isUK) setValue("pickUpServices", "");
    setValue("packageValue", ""); // reset value on country change
  }, [selectedSenderCountry, isUK, setValue]);

  const onSubmit = (data: InternationalFormData) => {
    console.log("International Shipment Data:", data);
    toast.success("Shipment Created Successfully!");
  };

  const inputClass = "w-full border-none bg-slate-100/50 rounded px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-slate-100 transition-colors";
  const disabledInputClass = "w-full border-none rounded px-3 py-2.5 text-sm text-slate-400 bg-slate-50 cursor-not-allowed";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const errorClass = "text-xs text-red-500 mt-1";
  const sectionTitle = "text-lg font-bold text-slate-800 mb-4 flex items-center gap-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}><span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Sender Information</h2>
        
        <div className="mb-6">
          <p className={labelClass}>Choose your Shipment type</p>
          <div className="flex gap-6">
            {(["air_cargo", "sea_cargo"] as const).map((v) => (
              <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                <input type="radio" value={v} {...register("shipmentType")} className="w-4 h-4 text-blue-600 border-slate-300" />
                {v === "air_cargo" ? "Air cargo" : "Sea cargo"}
              </label>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Country</label>
            <select {...register("senderCountry", { required: "Required" })} className={inputClass} disabled={loadingCountries}>
              <option value="">{loadingCountries ? "Loading countries..." : "Select country"}</option>
              {countries.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
            {errors.senderCountry && <p className={errorClass}>{errors.senderCountry.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className={`${labelClass} ${!isUK ? "text-slate-400" : ""}`}>
              Pickup Services
              {!isUK && <span className="ml-2 text-[10px] font-normal text-slate-400 uppercase tracking-wider">(Available only for United Kingdom)</span>}
            </label>
            {isUK ? (
              <div className="flex gap-6 mt-1">
                {(["yes", "no"] as const).map((v) => (
                  <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                    <input type="radio" value={v} {...register("pickUpServices", { required: isUK ? "Required" : false })} className="w-4 h-4 text-blue-600 border-slate-300" />
                    {v === "yes" ? "Yes" : "No"}
                  </label>
                ))}
              </div>
            ) : (
              <div className={disabledInputClass}>Select United Kingdom to enable</div>
            )}
          </div>

          <div>
            <label className={labelClass}>Full name</label>
            <input {...register("senderFullName", { required: "Required" })} placeholder="Type here..." className={inputClass} />
            {errors.senderFullName && <p className={errorClass}>{errors.senderFullName.message}</p>}
          </div>

          <div>
            <label className={labelClass}>Phone</label>
            <input {...register("senderPhone", { required: "Required" })} placeholder="Type here..." className={inputClass} />
            {errors.senderPhone && <p className={errorClass}>{errors.senderPhone.message}</p>}
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Address</label>
            <input {...register("senderAddress", { required: "Required" })} placeholder="Type here..." className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>What we are picking up</label>
            <select {...register("whatPickingUp", { required: "Required" })} className={inputClass}>
              <option value="">Select</option>
              <option value="electronics">Electronics</option>
              <option value="clothing">Clothing</option>
              <option value="personalized_cargo">Personalized Cargo</option>
              <option value="documents">Documents</option>
              <option value="others">Others</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Shipping Type</label>
            <select {...register("shippingType", { required: "Required" })} className={inputClass}>
              <option value="">Select</option>
              <option value="standard">Standard</option>
              <option value="express">Express</option>
              <option value="overnight">Overnight</option>
            </select>
          </div>

          {whatPickingUp === "others" && (
            <div className="md:col-span-2">
              <label className={labelClass}>Please specify</label>
              <input {...register("otherWhatPickingUp", { required: true })} placeholder="Specify items..." className={inputClass} />
            </div>
          )}

          <div className="md:col-span-2">
            <label className={labelClass}>Email</label>
            <input type="email" {...register("senderEmail", { required: "Required" })} placeholder="Type here..." className={inputClass} />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}><span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Package Information</h2>
        <div className="space-y-4">
          <label className={labelClass}>
            {selectedSenderCountry ? `Weight / Volume (${packageUnit})` : "Weight / Volume"}
          </label>
          <div className="flex gap-2">
            <input 
              type="number" 
              min="0" 
              step="0.01" 
              {...register("packageValue", { required: "Required" })} 
              placeholder={selectedSenderCountry ? `Enter value in ${packageUnit}` : "Select country first"} 
              className={`${inputClass} ${!selectedSenderCountry ? "bg-slate-50 cursor-not-allowed" : ""}`}
              disabled={!selectedSenderCountry}
            />
            <div className="flex items-center justify-center px-3 bg-slate-100/50 border-none rounded text-slate-500 text-sm font-medium min-w-[60px]">
              {selectedSenderCountry ? packageUnit : "—"}
            </div>
          </div>
          <input type="hidden" {...register("packageUnit")} value={packageUnit} />
          
          <div className="mt-4">
            <label className={labelClass}>Upload Image</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-slate-200 rounded cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm text-slate-500 font-medium">Click to upload parcel photo</span>
              <input type="file" accept="image/*" {...register("uploadImage")} className="hidden" />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}><span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Receiver Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Country</label>
            <select {...register("receiverCountry", { required: "Required" })} className={inputClass}>
              <option value="">Select country</option>
              {countries.map((name) => <option key={name} value={name}>{name}</option>)}
            </select>
          </div>

          <div>
            <label className={labelClass}>Full name</label>
            <input {...register("receiverFullName", { required: "Required" })} placeholder="Type here..." className={inputClass} />
          </div>

          <div>
            <label className={labelClass}>Phone</label>
            <input {...register("receiverPhone", { required: "Required" })} placeholder="Type here..." className={inputClass} />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Email</label>
            <input type="email" {...register("receiverEmail", { required: "Required" })} placeholder="Type here..." className={inputClass} />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Address</label>
            <input {...register("receiverAddress", { required: "Required" })} placeholder="Type here..." className={inputClass} />
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button type="submit" className="w-64 py-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-full transition-all shadow-md shadow-blue-100">
          Create Shipment
        </button>
      </div>
    </form>
  );
}
