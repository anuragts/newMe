"use client";

export default function getId(){
    if (typeof window !== 'undefined') {
    const id = localStorage.getItem("userId");
    console.log(id);
    return id;
    }
}