import {
    Drawer,
    DrawerClose,
    DrawerContent,
    DrawerDescription,
    DrawerFooter,
    DrawerHeader,
    DrawerTitle,
    DrawerTrigger,
} from "@/components/ui/drawer"
import React from "react";

export const CommentSection = () => {
    return (
        <div className="w-full">
            <Drawer className="w-full">
                <DrawerTrigger className="w-full">
                    <button className="w-full h-[50px] glass mt-4 hover:bg-white/20 transition-all">
                        Show Comments
                    </button>
                </DrawerTrigger>
                <DrawerContent>
                    <DrawerHeader>
                        <DrawerTitle>Comment Section</DrawerTitle>
                        <DrawerDescription>This is the comment section</DrawerDescription>
                    </DrawerHeader>
                    <DrawerFooter>

                    </DrawerFooter>
                </DrawerContent>
            </Drawer>
        </div>
    );
}
