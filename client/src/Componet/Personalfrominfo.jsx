import {
    BriefcaseBusiness,
    Github,
    Globe,
    Linkedin,
    Mail,
    MapPin,
    Phone,
    User
} from "lucide-react";
import React from "react";

const Personalfrominfo = ({
    data = {},
    onChange,
    removeBackground,
    setRemoveBackground
}) => {
    const handleChange = (field, value) => {
        onChange({...data, [field]: value});
    };

    const fields = [
        { key: "full_name", label: "Full Name", icon: User, type:"text", required: true },
        { key: "email", label: "Email Address", icon: Mail, type: "email", required: true },
        { key: "phone", label: "Phone Number", icon: Phone, type: "tel", required: true },
        { key: "location", label: "Address", icon: MapPin, type: "text" },
        { key: "profession", label: "Profession", icon: BriefcaseBusiness, type:"text" },
        { key: "linkedin", label: "LinkedIn Profile", icon: Linkedin, type: "url" },
        { key: "github", label: "GitHub Profile", icon: Github, type: "url" },
        { key: "website", label: "Website", icon: Globe, type: "url" }
    ];

    return (
        <div>
            <h3 className="text-lg font-semibold text-gray-900">Personal Information</h3>
            <p className="text-sm text-gray-600">
                Get started with the personal information
            </p>

            {/* IMAGE */}
            <div className="flex items-center gap-4 mt-4">
                <label className="cursor-pointer">
                    {data.image ? (
                        <img
                            src={
                                typeof data.image === "string"
                                    ? data.image
                                    : URL.createObjectURL(data.image)
                            }
                            alt="user"
                            className="w-16 h-16 rounded-full object-cover ring ring-slate-300"
                        />
                    ) : (
                        <div className="flex items-center gap-2 text-slate-500 hover:text-slate-700">
                            <User className="size-10 p-2.5 border rounded-full" />
                            Upload image
                        </div>
                    )}
                    <input
                        type="file"
                        accept="image/png, image/jpeg"
                        className="hidden"
                        onChange={(e) => handleChange("image", e.target.files[0])}
                    />
                </label>

                {/* REMOVE BG */}
                {data.image instanceof File && (
                    <label className="flex items-center gap-3 text-sm cursor-pointer">
                        <input
                            type="checkbox"
                            className="sr-only peer"
                            checked={removeBackground}
                            onChange={() => setRemoveBackground(prev => !prev)}
                        />
                        <div className="w-9 h-5 bg-slate-300 rounded-full peer-checked:bg-green-600 relative">
                            <span className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full transition-transform peer-checked:translate-x-4" />
                        </div>
                        Remove background
                    </label>
                )}
            </div>

            {/* INPUT FIELDS */}
            {fields.map((field) => {
                const Icon = field.icon;
                return (
                    <div key={field.key} className="mt-5 space-y-1">
                        <label className="flex items-center gap-2 text-sm font-medium text-gray-600">
                            <Icon className="size-4" />
                            {field.label}
                            {field.required && <span className="text-red-500">*</span>}
                        </label>

                        <input
                            type={field.type}
                            value={data[field.key] ?? ""}
                            onChange={(e) => handleChange(field.key, e.target.value)}
                            placeholder={`Enter your ${field.label.toLowerCase()}`}
                            required={field.required}
                            className="w-full px-3 py-2 border rounded-md
                         focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>
                );
            })}
        </div>
    );
};

export default Personalfrominfo;
