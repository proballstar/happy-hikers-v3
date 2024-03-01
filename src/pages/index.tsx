import { api } from "~/utils/api";
import RedesignedHeader from "../components/redesigned/header";
import PostFeeder from "../components/redesigned/post.feeder";
import { useUser } from "@clerk/nextjs";
import { LoadingPage } from "~/components/loading";
import { Component } from "~/components/hike-listing";

export default function Redesign() {

    const user = useUser();

    const { data, isLoading, error} = api.listings.getAll.useQuery()

   if (isLoading) return <LoadingPage />
   if (error) return <div>Error: {error.message}</div>
   

    return (
        <div className="flex flex-col">
            {/* Header */}
            <RedesignedHeader />
            {/* Feed */}
            <Component data={data} />
        </div>
    )
}