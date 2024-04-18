"use client";

import { useState } from "react";
import type { NextPage } from "next";
import { AddressInput } from "~~/components/scaffold-eth";
import { useScaffoldReadContract } from "~~/hooks/scaffold-eth/useScaffoldReadContract";
import { useScaffoldWriteContract } from "~~/hooks/scaffold-eth/useScaffoldWriteContract";

const Home: NextPage = () => {
  const [address, setAddress] = useState("");

  const { data: actualOwner } = useScaffoldReadContract({
    contractName: "YourContract",
    functionName: "owner",
  });

  const { writeContractAsync: setNewOwner } = useScaffoldWriteContract("YourContract");

  const setNewOwnerHandler = async () => {
    await setNewOwner({
      functionName: "setNewOwner",
      args: [address],
    });
  };

  return (
    <>
      <div className="flex items-center flex-col flex-grow pt-10">
        <div className="card w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title">Set new Owner</h2>
            <label>Actual Owner</label>
            <AddressInput
              disabled
              onChange={e => {
                console.log(e);
              }}
              value={actualOwner || ""}
              placeholder="Input your address"
            />
            <label>New Owner</label>
            <AddressInput onChange={setAddress} value={address} placeholder="Input your address" />
            <div className="card-actions justify-end">
              <button className="btn btn-primary w-full text-xl text-white" onClick={() => setNewOwnerHandler()}>
                Set New Owner
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
