import { UserProfile, useUser } from "@clerk/nextjs"
import { SVGProps } from "react"
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar"
import { Button } from "~/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuRadioGroup, DropdownMenuRadioItem, DropdownMenuTrigger } from "~/components/ui/dropdown-menu"


function HeartIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
    )
  }
  
  
  function MountainIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
      </svg>
    )
  }
  
  
  function ShareIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
        <polyline points="16 6 12 2 8 6" />
        <line x1="12" x2="12" y1="2" y2="15" />
      </svg>
    )
  }
  
  
  function StarIcon(props: JSX.IntrinsicAttributes & SVGProps<SVGSVGElement>) {
    return (
      <svg
        {...props}
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
      </svg>
    )
  }
  

function NewNav() {
    

    return (
        <div className="align-middle flex flex-row px-[15vw] py-[5vh]">
            <div className="mr-auto flex flex-row">
                <span>Happy Hiking</span>
            </div>
            <div className="ml-auto flex flex-row">
                <Button className="px-6 py-3 mr-[2vw] rounded-md text-white bg-gray-600" variant="destructive">Create New Event</Button>
                    <UserProfile />
            </div>
        </div>
    )
}

function Header() {
    const user = useUser()
    return (
        <div className="flex flex-row px-[15vw]">
            <div className="mr-auto">
                Featured Hikes:
            </div>
          <div className="ml-auto">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select Duration</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup defaultValue="short">
                <DropdownMenuRadioItem value="short">Short</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="long">Long</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select Difficulty</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup defaultValue="easy">
                <DropdownMenuRadioItem value="easy">Easy</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="medium">Medium</DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="hard">Hard</DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline">Select Rating</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup defaultValue="1">
                <DropdownMenuRadioItem value="1">
                  <StarIcon className="w-4 h-4" />
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="2">
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="3">
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="4">
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                </DropdownMenuRadioItem>
                <DropdownMenuRadioItem value="5">
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                  <StarIcon className="w-4 h-4" />
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
          </div>
        </div>
    )
}

export default function NewFeed() {
    return (
        <div className="flex flex-col">
            <NewNav />
            <Header />
        </div>
    )
}