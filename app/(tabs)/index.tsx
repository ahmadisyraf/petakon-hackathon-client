import CreateDonationButton from "@/components/create-donation-button";
import { Box } from "@/components/ui/box";
import { Button, ButtonText } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useSessionStore } from "@/store/user";
import { getDonationStatus } from "@/services/donation";

enum DonationStatusEnum {
  pending = "pending",
  completed = "completed",
  reserved = "reserved",
}

interface Donation {
  title: string;
  description: string;
  foodType: string;
  donationSize: string;
  transportationMethod: string;
  status: DonationStatusEnum;
}

export default function HomeScreen() {
  const [donationPending, setDonationPending] = useState<Donation>();
  const { accessToken } = useSessionStore();

  useEffect(() => {
    const fetchDonation = async () => {
      try {
        const status = DonationStatusEnum.pending;
        const donation = await getDonationStatus({ accessToken, status });
        console.log(donation);
        setDonationPending(donation.data);
      } catch (error) {
        console.error("Error fetching donation:", error);
      }
    };

    fetchDonation();
  }, []);

  console.log(donationPending);
  return (
    <Box>
      <Button>
        <ButtonText>{donationPending?.title}</ButtonText>
      </Button>
      <CreateDonationButton />
    </Box>
  );
}
