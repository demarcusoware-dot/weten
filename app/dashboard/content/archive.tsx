// "use client";

// import { useState } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import { Button } from "@/components/ui/button";
// import { Trash2, ImageIcon, VideoIcon, Plus } from "lucide-react";

// export default function ContentPage() {
//   const [images, setImages] = useState<any[]>([]);
//   const [videos, setVideos] = useState<any[]>([]);

//   const [details, setDetails] = useState("");
//   const [hostelName, setHostelName] = useState("");
//   const [location, setLocation] = useState("");
//   const [builtYear, setBuiltYear] = useState("");
//   const [totalRooms, setTotalRooms] = useState("");

//   const [roomTypes, setRoomTypes] = useState<any>([]);

//   const uploadToVercelBlob = async (files: File[]) => {
//     const form = new FormData();
//     files.forEach((file) => form.append("files", file));

//     const res = await fetch("/api/upload", {
//       method: "POST",
//       body: form,
//     });

//     const data = await res.json();
//     return data.files;
//   };

//   const handleImageUpload = async (e: any) => {
//     const files = Array.from(e.target.files) as File[];
//     const uploaded = await uploadToVercelBlob(files);
//     setImages((prev) => [...prev, ...uploaded]);
//   };

//   const handleVideoUpload = async (e: any) => {
//     const files = Array.from(e.target.files) as File[];
//     const uploaded = await uploadToVercelBlob(files);
//     setVideos((prev) => [...prev, ...uploaded]);
//   };

//   const deleteMedia = async (pathname: string, type: "image" | "video") => {
//     await fetch("/api/delete", {
//       method: "POST",
//       body: JSON.stringify({ pathname }),
//     });

//     type === "image"
//       ? setImages(images.filter((f) => f.pathname !== pathname))
//       : setVideos(videos.filter((f) => f.pathname !== pathname));
//   };

//   const addRoomType = () => {
//     setRoomTypes([...roomTypes, { type: "", quantity: 0, price: 0 }]);
//   };

//   const updateRoomType = (i: number, key: string, value: any) => {
//     const copy = [...roomTypes];
//     copy[i][key] = value;
//     setRoomTypes(copy);
//   };

//   const removeRoomType = (i: number) => {
//     setRoomTypes(roomTypes.filter((k: any, index: number) => index !== i));
//   };

//   return (
//     <div className="p-8 md:ml-10 md:mx-auto md:max-w-[90%] space-y-10 ">
//       {/* Hostel Basic Details */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="text-xl font-bold">
//             Hostel Information
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           <Input
//             placeholder="Hostel Name"
//             value={hostelName}
//             onChange={(e) => setHostelName(e.target.value)}
//           />

//           <Input
//             placeholder="Location (e.g., Accra - Legon, Cape Coast)"
//             value={location}
//             onChange={(e) => setLocation(e.target.value)}
//           />

//           <div className="grid grid-cols-2 gap-4">
//             <Input
//               placeholder="Year Built"
//               type="number"
//               value={builtYear}
//               onChange={(e) => setBuiltYear(e.target.value)}
//             />

//             <Input
//               placeholder="Total Number of Rooms"
//               type="number"
//               value={totalRooms}
//               onChange={(e) => setTotalRooms(e.target.value)}
//             />
//           </div>

//           <Textarea
//             placeholder="General Hostel Description"
//             value={details}
//             onChange={(e) => setDetails(e.target.value)}
//             className="min-h-[120px]"
//           />

//           <Button className="w-fit">Save Details</Button>
//         </CardContent>
//       </Card>

//       {/* Room Types */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center justify-between text-xl font-bold">
//             Room Types & Pricing
//             <Button size="sm" onClick={addRoomType}>
//               <Plus className="w-4 h-4 mr-1" /> Add Room Type
//             </Button>
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           {roomTypes.map((room: any, index: number) => (
//             <div
//               key={index}
//               className="grid grid-cols-1 md:grid-cols-4 items-center gap-4 border p-4 rounded-lg"
//             >
//               <Input
//                 placeholder="Type (e.g., 4 in 1)"
//                 value={room.type}
//                 onChange={(e) => updateRoomType(index, "type", e.target.value)}
//               />
//               <Input
//                 placeholder="Quantity"
//                 type="number"
//                 value={room.quantity}
//                 onChange={(e) =>
//                   updateRoomType(index, "quantity", Number(e.target.value))
//                 }
//               />
//               <Input
//                 placeholder="Price (GHS)"
//                 type="number"
//                 value={room.price}
//                 onChange={(e) =>
//                   updateRoomType(index, "price", Number(e.target.value))
//                 }
//               />

//               <Button
//                 variant="destructive"
//                 size="icon"
//                 onClick={() => removeRoomType(index)}
//               >
//                 <Trash2 />
//               </Button>
//             </div>
//           ))}
//         </CardContent>
//       </Card>

//       {/* Upload Images */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-xl font-bold">
//             <ImageIcon /> Upload Images
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           <Input
//             type="file"
//             accept="image/*"
//             multiple
//             onChange={handleImageUpload}
//           />

//           <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
//             {images.map((img, index) => (
//               <div key={index} className="relative">
//                 <img
//                   src={img.url}
//                   className="w-full h-32 object-cover rounded-lg"
//                 />

//                 <Button
//                   variant="destructive"
//                   size="icon"
//                   onClick={() => deleteMedia(img.pathname, "image")}
//                   className="absolute top-2 right-2"
//                 >
//                   <Trash2 />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>

//       {/* Upload Videos */}
//       <Card>
//         <CardHeader>
//           <CardTitle className="flex items-center gap-2 text-xl font-bold">
//             <VideoIcon /> Upload Videos
//           </CardTitle>
//         </CardHeader>

//         <CardContent className="space-y-4">
//           <Input
//             type="file"
//             accept="video/*"
//             multiple
//             onChange={handleVideoUpload}
//           />

//           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//             {videos.map((vid, index) => (
//               <div key={index} className="relative">
//                 <video src={vid.url} controls className="w-full rounded-lg" />
//                 <Button
//                   variant="destructive"
//                   className="absolute top-2 right-2"
//                   size="icon"
//                   onClick={() => deleteMedia(vid.pathname, "video")}
//                 >
//                   <Trash2 />
//                 </Button>
//               </div>
//             ))}
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }
