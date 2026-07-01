import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

type IndividualFormData = {
  shipmentType: "air_cargo" | "sea_cargo";
  serviceType: "warehouse" | "drop_off";
  senderFullName: string;
  senderPhone: string;
  senderEmail: string;
  senderAddress: string;
  senderCountry: string;
  receiverFullName: string;
  receiverPhone: string;
  receiverEmail: string;
  receiverAddress: string;
  receiverCountry: string;
  weight: string;
  description: string;
  uploadImage: FileList;
};

export default function IndividualForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IndividualFormData>({
    defaultValues: {
      shipmentType: "air_cargo",
      serviceType: "warehouse",
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

  const onSubmit = (data: IndividualFormData) => {
    console.log("=== Individual Shipment Data ===", data);
    toast.success("Individual Shipment Created!");
  };

  const inputClass = "w-full border-none bg-slate-100/50 rounded px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-slate-100 transition-colors";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const errorClass = "text-xs text-red-500 mt-1";
  const sectionTitle = "text-lg font-bold text-slate-800 mb-4 flex items-center gap-2";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8 max-w-4xl mx-auto pb-12">
      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}><span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Shipment Information</h2>
        
        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <div>
            <p className={labelClass}>Shipment type</p>
            <div className="flex gap-6">
              {(["air_cargo", "sea_cargo"] as const).map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                  <input type="radio" value={v} {...register("shipmentType")} className="w-4 h-4 text-blue-600 border-slate-300" />
                  {v === "air_cargo" ? "Air cargo" : "Sea cargo"}
                </label>
              ))}
            </div>
          </div>
          <div>
            <p className={labelClass}>Service Type</p>
            <div className="flex gap-6">
              {(["warehouse", "drop_off"] as const).map((v) => (
                <label key={v} className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer">
                  <input type="radio" value={v} {...register("serviceType")} className="w-4 h-4 text-blue-600 border-slate-300" />
                  {v === "warehouse" ? "Warehouse" : "Drop off"}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}><span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Sender Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Full Name</label>
            <input {...register("senderFullName", { required: "Required" })} placeholder="Enter sender name" className={inputClass} />
            {errors.senderFullName && <p className={errorClass}>{errors.senderFullName.message}</p>}
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input {...register("senderPhone", { required: "Required" })} placeholder="Enter phone" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input type="email" {...register("senderEmail", { required: "Required" })} placeholder="Enter email" className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Country</label>
            <select {...register("senderCountry", { required: "Required" })} className={inputClass}>
              <option value="">{loadingCountries ? "Loading..." : "Select country"}</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Full Address</label>
            <input {...register("senderAddress", { required: "Required" })} placeholder="Enter address" className={inputClass} />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}><span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Receiver Information</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Full Name</label>
            <input {...register("receiverFullName", { required: "Required" })} placeholder="Enter receiver name" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Phone Number</label>
            <input {...register("receiverPhone", { required: "Required" })} placeholder="Enter phone" className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input type="email" {...register("receiverEmail", { required: "Required" })} placeholder="Enter email" className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Country</label>
            <select {...register("receiverCountry", { required: "Required" })} className={inputClass}>
              <option value="">{loadingCountries ? "Loading..." : "Select country"}</option>
              {countries.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Full Address</label>
            <input {...register("receiverAddress", { required: "Required" })} placeholder="Enter address" className={inputClass} />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}><span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Package Details</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Weight (KG)</label>
            <input type="number" step="0.01" {...register("weight", { required: "Required" })} placeholder="0.00" className={inputClass} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Parcel Description</label>
            <textarea {...register("description", { required: "Required" })} placeholder="What's inside?" className={`${inputClass} min-h-[100px] resize-none`} />
          </div>
          <div className="md:col-span-2">
            <label className={labelClass}>Upload Photo</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-slate-200 rounded cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm text-slate-500 font-medium">Click to upload parcel photo</span>
              <input type="file" accept="image/*" {...register("uploadImage")} className="hidden" />
            </label>
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
