import { useForm } from "react-hook-form";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";

type NigeriaToAbroadFormData = {
  shipmentType: string;
  serviceType: "warehouse" | "drop_off";
  senderCountry: string; // always "Nigeria" internally
  senderFullName: string;
  senderPhone: string;
  senderEmail: string;
  senderAddress: string;
  insurance: "Yes" | "No";
  valuesOfGoods: string;
  kilosOfGoods: string;
  packageKg: string;
  selectHub: string;
  receiverCountry: string;
  receiverFullName: string;
  receiverPhone: string;
  receiverEmail: string;
  receiverAddressLine1: string;
  receiverPostalCode: string;
  pickupAddress: string;
  pickupSelectHub: string;
  uploadImage: FileList;
  paymentServiceType: string;
  paymentCurrencyType: string;
  paymentAmountPayable: string;
};

export default function NigeriaToAbroadForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<NigeriaToAbroadFormData>({
    defaultValues: {
      shipmentType: "air_cargo",
      senderCountry: "Nigeria", // always fixed
      insurance: "No",
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

  const onSubmit = (data: NigeriaToAbroadFormData) => {
    const finalData = { ...data, senderCountry: "Nigeria" };
    console.log("=== Nigeria to Abroad Form Data ===", finalData);
    toast.success("Shipment Invoice Created Successfully!");
  };

  const inputClass =
    "w-full border-none bg-slate-100/50 rounded px-3 py-2.5 text-sm text-slate-700 placeholder-slate-400 focus:outline-none focus:bg-slate-100 transition-colors";
  const labelClass = "block text-sm font-medium text-slate-700 mb-1";
  const errorClass = "text-xs text-red-500 mt-1";
  const sectionTitle =
    "text-lg font-bold text-slate-800 mb-4 flex items-center gap-2";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-8 max-w-4xl mx-auto pb-12"
    >
      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}>
          <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Shipment
          Information
        </h2>

        <div className="flex flex-wrap gap-x-12 gap-y-6">
          <div>
            <p className={labelClass}>Choose your Shipment type</p>
            <div className="flex gap-6">
              {(["air_cargo", "sea_cargo", "express_shipment"] as const).map(
                (v) => (
                  <label
                    key={v}
                    className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer"
                  >
                    <input
                      type="radio"
                      value={v}
                      {...register("shipmentType")}
                      className="w-4 h-4 text-blue-600 border-slate-300"
                    />
                    {v === "air_cargo"
                      ? "Air cargo"
                      : v === "sea_cargo"
                        ? "Sea cargo"
                        : "Express Shipment"}
                  </label>
                ),
              )}
            </div>
          </div>
          <div>
            <p className={labelClass}>Choose Your Service</p>
            <div className="flex gap-6">
              {(["warehouse", "drop_off"] as const).map((v) => (
                <label
                  key={v}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={v}
                    {...register("serviceType")}
                    className="w-4 h-4 text-blue-600 border-slate-300"
                  />
                  {v === "warehouse" ? "Ware House" : "Drop off"}
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}>
          <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Sender
          Information
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Full name</label>
            <input
              {...register("senderFullName", { required: "Required" })}
              placeholder="Type here..."
              className={inputClass}
            />
            {errors.senderFullName && (
              <p className={errorClass}>{errors.senderFullName.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Phone</label>
            <input
              {...register("senderPhone", { required: "Required" })}
              placeholder="Type here..."
              className={inputClass}
            />
            {errors.senderPhone && (
              <p className={errorClass}>{errors.senderPhone.message}</p>
            )}
          </div>

          <div>
            <label className={labelClass}>Email</label>
            <input
              type="email"
              {...register("senderEmail", { required: "Required" })}
              placeholder="Type here..."
              className={inputClass}
            />
            {errors.senderEmail && (
              <p className={errorClass}>{errors.senderEmail.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Address</label>
            <input
              {...register("senderAddress", { required: "Required" })}
              placeholder="Type here..."
              className={inputClass}
            />
            {errors.senderAddress && (
              <p className={errorClass}>{errors.senderAddress.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Sender Country</label>
            <div className="w-full bg-slate-100/50 border-none rounded px-3 py-2.5 text-sm text-slate-600 flex items-center gap-2">
              <span>🇳🇬</span>
              <span className="font-bold text-slate-800">Nigeria</span>
              <span className="ml-auto text-[10px] bg-slate-200 px-2 py-0.5 rounded text-slate-500 uppercase font-bold tracking-wider">
                Fixed
              </span>
            </div>
            <input
              type="hidden"
              {...register("senderCountry")}
              value="Nigeria"
            />
          </div>

          <div className="md:col-span-2">
            <p className={labelClass}>Insurance</p>
            <div className="flex gap-6">
              {(["Yes", "No"] as const).map((v) => (
                <label
                  key={v}
                  className="flex items-center gap-2 text-sm font-medium text-slate-600 cursor-pointer"
                >
                  <input
                    type="radio"
                    value={v}
                    {...register("insurance")}
                    className="w-4 h-4 text-blue-600 border-slate-300"
                  />
                  {v}
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className={labelClass}>Values of Goods</label>
            <input
              {...register("valuesOfGoods", { required: "Required" })}
              placeholder="Type here..."
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Weight (Unit: KG)</label>
            <div className="flex gap-2">
              <input
                type="number"
                min="0"
                step="0.01"
                {...register("packageKg", { required: "Required" })}
                placeholder="Enter weight in KG"
                className={inputClass}
              />
              <div className="flex items-center px-3 bg-slate-100/50 border-none rounded text-slate-500 text-sm font-medium min-w-[60px] justify-center">
                KG
              </div>
            </div>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Select Processing Hub</label>
            <select
              {...register("selectHub", { required: "Required" })}
              className={inputClass}
            >
              <option value="">Select Hub</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
              <option value="port_harcourt">Port Harcourt</option>
              <option value="benin">Benin</option>
              <option value="ibadan">Ibadan</option>
            </select>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}>
          <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Receiver
          Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Country</label>
            <select
              {...register("receiverCountry", { required: "Required" })}
              className={inputClass}
            >
              <option value="">
                {loadingCountries ? "Loading countries..." : "Select country"}
              </option>
              {countries.map((name) => (
                <option key={name} value={name}>
                  {name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={labelClass}>Full name</label>
            <input
              {...register("receiverFullName", { required: "Required" })}
              placeholder="Type here..."
              className={inputClass}
            />
          </div>

          <div>
            <label className={labelClass}>Phone</label>
            <input
              {...register("receiverPhone", { required: "Required" })}
              placeholder="Type here..."
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Email</label>
            <input
              type="email"
              {...register("receiverEmail", { required: "Required" })}
              placeholder="Type here..."
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Address line 1</label>
            <input
              {...register("receiverAddressLine1", { required: "Required" })}
              placeholder="Type here..."
              className={inputClass}
            />
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Postal / Zip Code</label>
            <input
              {...register("receiverPostalCode", { required: "Required" })}
              placeholder="Type here..."
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}>
          <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Pickup &
          Package Image
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className={labelClass}>Choose your pickup type</label>
            <select
              {...register("pickupSelectHub", { required: "Required" })}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="doorstepdelivery">Doorstep delivery</option>
              <option value="warehousepickup">Warehouse pickup</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Upload Image</label>
            <label className="flex flex-col items-center justify-center w-full h-32 border border-dashed border-slate-200 rounded cursor-pointer hover:border-blue-400 hover:bg-blue-50/50 transition-all duration-200">
              <Upload className="w-8 h-8 text-slate-400 mb-2" />
              <span className="text-sm text-slate-500 font-medium tracking-tight">
                Click to upload parcel photo
              </span>
              <input
                type="file"
                accept="image/*"
                {...register("uploadImage")}
                className="hidden"
              />
            </label>
          </div>
        </div>
      </div>

      <div className="bg-white p-8 rounded border border-slate-100 shadow-sm">
        <h2 className={sectionTitle}>
          <span className="w-1.5 h-6 bg-blue-600 rounded-full" /> Payment
          Information
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className={labelClass}>Service Type</label>
            <select
              {...register("paymentServiceType", { required: "Required" })}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="air_cargo">Air Cargo</option>
              <option value="sea_cargo">Sea Cargo</option>
              <option value="personalized_cargo">Personalized Cargo</option>
              <option value="frozen_cargo">Frozen Cargo</option>
              <option value="fresh_cargo">Fresh Cargo</option>
              <option value="express_cargo">Express Cargo</option>
              <option value="packaging">Packaging</option>
            </select>
          </div>

          <div>
            <label className={labelClass}>Currency Type</label>
            <select
              {...register("paymentCurrencyType", { required: "Required" })}
              className={inputClass}
            >
              <option value="">Select</option>
              <option value="naira">Naira (₦)</option>
              <option value="usd">USD Dollar ($)</option>
              <option value="cad">CAD</option>
              <option value="aud">AUD</option>
              <option value="euro">EURO</option>
              <option value="gbp">GBP</option>
            </select>
          </div>

          <div className="md:col-span-2">
            <label className={labelClass}>Amount Payable</label>
            <input
              {...register("paymentAmountPayable", { required: "Required" })}
              placeholder="Enter amount"
              className={inputClass}
            />
          </div>
        </div>
      </div>

      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="w-64 py-4 bg-blue-600 hover:bg-blue-700 text-white text-base font-bold rounded-full transition-all shadow-md shadow-blue-100"
        >
          Send Invoice
        </button>
      </div>
    </form>
  );
}
