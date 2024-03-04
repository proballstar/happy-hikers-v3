import { useRouter } from "next/router";
import { LoadingPage } from "~/components/loading";
import { api } from "~/utils/api";

export default function User() {

    const router = useRouter();
    const uid: string = router.query.uid as string

    const { data, isLoading } = api.user.getProfileInfo.useQuery({id: uid})

    if(isLoading) return <LoadingPage />

    return (
        <div>
            {JSON.stringify(data)}
        </div>
    );
}