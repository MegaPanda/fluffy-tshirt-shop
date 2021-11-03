import { ref, child, get } from "firebase/database";
import { firebaseDatabase } from "../firebase/firebase";
import { FirebaseError } from "@firebase/util";
import { useEffect, useState } from "react";

const useGetData = (key: string) => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const dbRef = ref(firebaseDatabase);
        get(child(dbRef, key)).then((DataSnapshot) => {
            if (DataSnapshot.exists()) {
                setData(DataSnapshot.val());
            } else {
                console.log("No data available");
            }
        }).catch((error: unknown) => {
            if (error instanceof FirebaseError) {
                console.log(error);
            }
        })
    }, [key]);

    return data;
};

export default useGetData;