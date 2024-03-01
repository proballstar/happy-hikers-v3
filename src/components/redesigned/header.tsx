import { useUser } from "@clerk/nextjs";
import ProfileButton from "~/components/profile";
import { useRouter } from "next/navigation";

export default function RedesignedHeader() {
    
    const user = useUser();
    const router = useRouter();

    function redirect_to_route(route: string) {
        router.push(route)
    }

    return (
        <div className="flex flex-row justify-around px-6 py-4">
                <div className="flex flex-row mr-auto pl-5">
                    <button onClick={() => redirect_to_route("/")} className="text-[1.5rem] font-bold text-green-700">Happy Hiking</button>
                </div>
                <div className="flex space-x-5 flex-row ml-auto pr-5">
                    <button onClick={() => redirect_to_route("/feed")} className="text-[1.15rem]">Feed</button>
                    <button onClick={() => redirect_to_route("/create")} className="text-[1.15rem] px-5 py-1 bg-green-700 rounded-full text-white">Create</button>
                    <ProfileButton isSignedIn={user.isSignedIn} />
                </div>
        </div>
    )
}