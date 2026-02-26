export interface User {
    id: number;
    status: string;
    organization: string;
    dateJoined: string;
    profile: {
        fullName: string;
        username: string;
        avatar: string | null;
        phoneNumber: string;
        email: string;
        bvn: string;
        gender: string;
        maritalStatus: string;
        children: string;
        typeOfResidence: string;
    };
    educationAndEmployment: {
        levelOfEducation: string;
        employmentStatus: string;
        sectorOfEmployment: string;
        durationOfEmployment: string;
        officeEmail: string;
        monthlyIncome: {
            min: number;
            max: number;
            currency: string;
        };
        loanRepayment: number;
    };
    socials: {
        twitter: string;
        facebook: string;
        instagram: string;
    };
    guarantors: Array<{
        fullName: string;
        phoneNumber: string;
        email: string;
        relationship: string;
    }>;
    account: {
        accountNumber: string;
        bankName: string;
        balance: {
            amount: number;
            currency: string;
        };
        tier: number;
    };
}