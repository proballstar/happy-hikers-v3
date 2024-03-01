import { HeartIcon, ShareIcon } from "lucide-react";
import { Button } from "./button";
import { Card, CardHeader, CardContent } from "./card";
import { RouterOutputs } from "~/utils/api";
import { useRouter } from "next/navigation";

export default function HikingCard(props: RouterOutputs['listings']['getAll']['0']) {

    const router = useRouter()

    function navigate(id: string) {
        router.push(`/hike/${id}`)
    }

    return (
        <Card className="shadow-lg rounded-xl" onClick={() => navigate(props.post.id)}>
            <CardHeader>
              <h2 className="text-lg font-semibold">{props.post.name}</h2>
            </CardHeader>
            <CardContent>
              <img
                alt={`Photo of ${props.post.name}`}
                className="aspect-[3/2] overflow-hidden rounded-lg object-cover object-center mb-2"
                height="200"
                src={props.post.photo!}
                width="300"
              />
              <p className="text-sm text-gray-500">{props.post.desc}</p>
              <div className="flex flex-col w-full items-center mt-4">
                <Button className="mr-2 w-full" variant="outline">
                  <HeartIcon className="w-4 h-4" /> Open
                </Button>
              </div>
            </CardContent>
          </Card>
    )
}