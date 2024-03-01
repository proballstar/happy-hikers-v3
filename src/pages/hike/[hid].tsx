/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import React, { useState } from "react";
import { useUser } from "@clerk/nextjs";
import { useRouter } from "next/router";
import { LoadingPage } from "~/components/loading";
import Modal from "~/components/modal";
import { api } from "~/utils/api";
import Input from "~/components/input";
import Head from "next/head";
import RedesignedHeader from "~/components/redesigned/header";
import { HeartIcon, ShareIcon } from "lucide-react";
import { Button } from "~/components/ui/button";

interface ToggleProps {
  children: React.ReactNode;
  name: string;
}

function ToggleButton({ children, name }: ToggleProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <label className="relative mx-3  my-3 inline-flex cursor-pointer select-none items-center">
        <input
          type="checkbox"
          name="autoSaver"
          className="sr-only"
          checked={open}
          onChange={() => setOpen((prev) => !prev)}
        />
        <span
          className={`slider mr-3 flex h-[26px] w-[50px] items-center rounded-full p-1 duration-200 ${
            open ? "bg-green-700" : "bg-[#CCCCCE]"
          }`}
        >
          <span
            className={`dot h-[18px] w-[18px] rounded-full bg-white duration-200 ${
              open ? "translate-x-6" : ""
            }`}
          ></span>
        </span>
        <span className="label flex items-center text-sm font-medium text-black">
          {name} <span className="pl-1"> {open ? "Open" : "Closed"} </span>
        </span>
      </label>
      {open && children}
      {!open && <div></div>}
    </>
  );
}

function RouteSelector({ url, name }: { url: string; name: string }) {
  function copy() {
    void navigator.clipboard.writeText(url);
  }

  function route(url: string) {
    if (url.startsWith("https://")) {
      window.location.replace(url);
    } else if (url.includes("www")) {
      window.location.replace(`https://${url}`);
    } else {
      window.location.replace(`https://www.${url}`);
    }
  }

  return (
    <div className="flex w-full flex-row">
      <button
        className="w-full rounded-[1rem] border-2 border-black px-4 py-2 font-semibold text-black"
        onClick={() => route(url)}
      >
        Open {name}
      </button>
    </div>
  );
}

export default function SpecificHikePage() {
  const router = useRouter();
  const { user } = useUser();
  const [modalOpen, setModalOpen] = React.useState(false);
  const hid = router.query.hid as string;
  const { data, isLoading: postLoading } = api.listings.getPost.useQuery({
    id: hid,
  });
  const [comments, setComments] = React.useState("");
  const { mutate, isLoading: joinLoading } =
    api.listings.joinEvent.useMutation();

  if (!data || postLoading) return <LoadingPage />;

  function joinEvent() {
    if (!user) {
      router
        .push("/sign-in")
        .then(() => {
          return;
        })
        .catch(() => {
          return;
        });
    }
    if (!user?.primaryEmailAddress?.emailAddress)
      return <div>Please update your email address to join this event</div>;
    mutate({
      email: user.primaryEmailAddress?.emailAddress,
      event_id: hid,
      comment: comments,
    });
    setComments("");
  }

  function modalClose() {
    setModalOpen(false);
    router.reload();
  }

  return (
    <>
      <Head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5539865102402934"
          crossOrigin="anonymous"
        ></script>
      </Head>
      <RedesignedHeader />
      <div className="flex flex-col gap-3 overflow-hidden px-10 py-8">
        <div className="w-screen ">
          <div className="mx-auto flex w-[40vw] flex-col rounded-[1rem] bg-gray-100 shadow-md">
            <img
              className="rounded-t-[1rem]"
              src="https://tse1.mm.bing.net/th?id=OIP.fKmS3znemZvcYbkOyk7OPAHaEK&pid=Api"
              alt="Hiking"
            />
            <div className="space-y-[0.5rem] p-6">
              <h1 className="text-4xl font-bold capitalize">
                {data.post.name}
              </h1>
              <h2 className="text-xl capitalize">
                Hosted by {`${data.author.firstName} ${data.author.lastName}`}
              </h2>
              <p className="text-2xl">
                <b>Description</b>: {data.post.desc}
              </p>
            </div>
            <div className="space-y-[0.5rem] p-6">
              <h3 className="text-3xl font-bold">Important Info</h3>
              <div className="flex flex-col text-2xl">
                <p>
                  {" "}
                  <span className="font-semibold">From:</span>
                  {data.post.start?.toDateString()} at{" "}
                  {data.post.start?.toLocaleTimeString()}
                </p>
                <p>
                  {" "}
                  <span className="font-semibold">To: </span>{" "}
                  {data.post.end?.toDateString()} at{" "}
                  {data.post.end?.toLocaleTimeString()}
                </p>
              </div>
            </div>
            <ToggleButton name="Attendees">
              {data.post.Attendees.length > 0 && (
                <div className="space-y-[0.5rem] p-6">
                  <h3 className="text-3xl font-bold">Attendees</h3>
                  <div className="flex flex-col">
                    {data.post.Attendees.map((attendee) => {
                      const fullName = `${attendee.Person!
                        .fname!} ${attendee.Person!.lname!}`;
                      return (
                        <div
                          className="flex flex-row"
                          key={`Attendee-${attendee.Person?.fname}-${attendee.Person?.lname}`}
                        >
                          {fullName}: {attendee.comment}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </ToggleButton>
            <ToggleButton name="Itinerary">
              {data.post.EventItem.length > 0 && (
                <div className="space-y-[0.5rem] p-6">
                  {data.post.EventItem.map((item) => {
                    return (
                      <div
                        className="flex flex-row"
                        key={`EventItem-${item.id}`}
                      >
                        {item.name}: {item.addr} -{" "}
                        {item.start_time?.toLocaleTimeString()}
                      </div>
                    );
                  })}
                </div>
              )}
            </ToggleButton>
            <div className="w-full space-y-[0.5rem] rounded-b-[1rem] p-6">
              {data.post.route && (
                <RouteSelector name="Route" url={data.post.route} />
              )}
              {data.post.photo && (
                <RouteSelector name="Photo Album" url={data.post.photo} />
              )}
              {/* <a onClick={() => route(data.post.route!)} className="flex justify-center px-6 py-4 border-2 border-slate-600 rounded-[1rem]">
                                Route
                            </a> */}
              <button
                onClick={() => setModalOpen(true)}
                data-modal-target="defaultModal"
                data-modal-toggle="defaultModal"
                className="my-2 flex w-full justify-center rounded-[1rem] bg-green-500 px-6 py-4 text-white"
              >
                Join Event
              </button>
            </div>
            <div className="flex flex-col w-full items-center mt-4">
                <Button className="mr-2 w-full" variant="outline">
                  <HeartIcon className="w-4 h-4" /> Like
                </Button>
                <Button className="mr-2 w-full" variant="outline">
                  <ShareIcon className="w-4 h-4" /> Share
                </Button>
                {data.post.Discussions.length > 0 && (
                  <div className="flex flex-col">
                    <h3 className="text-3xl font-bold">Discussion</h3>
                    {data.post.Discussions.map((discussion) => {
                      return (
                        <div
                          className="flex flex-row"
                          key={`Discussion-${discussion.id}`}
                        >
                          {`${discussion.Person.fname} ${discussion.Person.lname}`}
                          {discussion.messages}
                        </div>
                      );
                    })}
                  </div>
                
                )}
                <input
                  className="border rounded px-2 py-1 w-full flex-grow"
                  id="comment1"
                  placeholder="Add a comment..."
                  type="text"
                  value={comments}
                  onChange={(e) => setComments(e.target.value)}
                />
              </div>
          </div>
        </div>
      </div>
      <Modal
        header="Join Event"
        sub_message="Close"
        close={() => modalClose()}
        open={() => setModalOpen(true)}
        isOpen={modalOpen}
      >
        <div className="flex flex-col p-4">
          <Input
            name="Comments"
            placeholder="Enter any comments here"
            value={comments}
            onChange={(e) => setComments(e.target.value)}
          />
          <button
            onClick={() => joinEvent()}
            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
          >
            {joinLoading ? "Loading..." : "Join"}
          </button>
        </div>
      </Modal>
    </>
  );
}