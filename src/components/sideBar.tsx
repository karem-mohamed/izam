"use client";
import { useDrag, useDrop } from "react-dnd";
import Link from "next/link";
import useSideBarContext from "@/context/sideBarContext/useSideBarContext";
import { IoSettingsOutline } from "react-icons/io5";
import { FaArrowLeftLong } from "react-icons/fa6";
import { useFetchSideBarItems } from "@/endpoints/sideBar/getSideBarItems";
import React, { useEffect, useRef, useState } from "react";
import { NavItem } from "@/endpoints/sideBar/types";
import { AiOutlineCheckCircle } from "react-icons/ai";
import { VscError } from "react-icons/vsc";
import { MdDragIndicator } from "react-icons/md";
import { MdOutlineEdit } from "react-icons/md";
import { FaRegEye } from "react-icons/fa6";
import { FaRegEyeSlash } from "react-icons/fa6";
import { useTrackSideBarItems } from "@/endpoints/sideBar/trackSideBarItems";
import useToast from "@/context/toastContext/useToast";
import { useOrderSideBarItems } from "@/endpoints/sideBar/orderSideBarItems";

export default function Sidebar() {
  const [isLongPress, setIsLongPress] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const { isOpen, openSideBar } = useSideBarContext();
  const { showToast } = useToast();
  const { data, mutateAsync } = useFetchSideBarItems();
  const { mutateAsync: trackItem, isSuccess } = useTrackSideBarItems();
  const { mutateAsync: orderItems, isSuccess: isOrderSucess } =
    useOrderSideBarItems();

  const [items, setItems] = useState<NavItem[]>([]);
  const [isSettingOpen, setIsSettingOpen] = useState<boolean>(false);

  useEffect(() => {
    if (data?.length) {
      setItems(structuredClone(data));
    }
  }, [data]);

  useEffect(() => {
    mutateAsync();
  }, []);

  useEffect(() => {
    if (isSuccess) {
      showToast("Created Successfully", "success");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isOrderSucess) {
      mutateAsync();
      setIsSettingOpen(false);
      showToast("Ordered Successfully", "success");
    }
  }, [isOrderSucess]);

  const handleVisability = (
    id: number,
    status: boolean,
    parent_id?: number
  ) => {
    let newItems = [...items];
    if (parent_id) {
      const parent = newItems.find((item) => item.id === parent_id);
      const item = parent?.children?.find((item) => item.id == id);
      if (item) {
        item.visible = status;
      }
      setItems(newItems);
    } else {
      const item = newItems?.find((item) => item.id == id);
      if (item) {
        item.visible = status;
      }
      setItems(newItems);
    }
  };

  const moveItem = (fromID: number, toID: number) => {
    const updatedItems = [...items];
    const fromIndex = updatedItems.findIndex((item) => item.id === fromID);
    const toIndex = updatedItems.findIndex((item) => item.id === toID);

    if (fromIndex === -1 || toIndex === -1) return;

    const [movedItem] = updatedItems.splice(fromIndex, 1);
    updatedItems.splice(toIndex, 0, movedItem);
    setItems(updatedItems);
    trackItem({ id: fromID, from: fromID, to: toID });
  };

  const moveSubItem = (parentId: number, fromID: number, toID: number) => {
    const updatedItems = [...items];
    const parent = updatedItems.find((item) => item.id === parentId);
    if (parent?.children) {
      const fromIndex = parent.children.findIndex((item) => item.id === fromID);
      const toIndex = parent.children.findIndex((item) => item.id === toID);

      if (fromIndex === -1 || toIndex === -1) return;

      const [movedItem] = parent.children.splice(fromIndex, 1);
      parent.children.splice(toIndex, 0, movedItem);
      setItems(updatedItems);
      trackItem({ id: fromID, from: fromID, to: toID });
    }
  };

  const sendNewOrders = () => {
    orderItems(items);
  };

  const cancelOrder = () => {
    if (data?.length) {
      setItems(structuredClone(data));
    }
    setIsSettingOpen(false);
  };

  const startPress = () => {
    timerRef.current = setTimeout(() => {
      setIsSettingOpen(true);
    }, 700);
  };

  const stopPress = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <div
      className={`sticky max-[590px]:fixed top-0 min-[590px]:top-[80px] left-0 flex flex-col h-[calc(100vh-80px)] max-[590px]:h-[100vh] bg-white text-gray-600 transition-all duration-300 z-10 min-[590px]:block ${
        isOpen ? "block" : "hidden"
      } w-80 max-[590px]:w-full p-5 pt-8 overflow-scroll`}
    >
      <div className="flex justify-between items-center mb-4">
        <div className="flex justify-between items-center gap-2">
          <button onClick={() => openSideBar(false)}>
            <FaArrowLeftLong size={18} />
          </button>
          <span>Menu</span>
        </div>
        {isSettingOpen ? (
          <div className="flex gap-1">
            <button onClick={() => cancelOrder()}>
              <VscError size={32} className="text-red-600" />
            </button>
            <button onClick={() => sendNewOrders()}>
              <AiOutlineCheckCircle size={34} className="text-green-600" />
            </button>
          </div>
        ) : (
          <button onClick={() => setIsSettingOpen(true)}>
            <IoSettingsOutline size={30} />
          </button>
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <nav>
          <ul className="space-y-2">
            {items.map((item) => (
              <SidebarItem
                key={item.id}
                id={item.id}
                text={item.title}
                visible={item.visible === false ? false : true}
                handleVisability={handleVisability}
                path={item.target}
                isSettingOpen={isSettingOpen}
                nested={item.children}
                isMain={true}
                moveItem={moveItem}
                moveSubItem={moveSubItem}
                startPress={startPress}
                stopPress={stopPress}
              />
            ))}
          </ul>
        </nav>
        <div className="flex flex-col">
          <button className="p-4 text-white focus:outline-none">logout</button>
        </div>
      </div>
    </div>
  );
}

function SidebarItem({
  id,
  text,
  path,
  isSettingOpen,
  nested,
  isMain,
  visible,
  handleVisability,
  moveItem,
  moveSubItem,
  parentId,
  startPress,
  stopPress,
}: {
  id: number;
  text: string;
  path: string;
  isSettingOpen: boolean;
  moveItem: (from: number, to: number) => void;
  handleVisability: (id: number, status: boolean, parent_id?: number) => void;
  startPress: () => void;
  stopPress: () => void;
  moveSubItem?: (parentId: number, from: number, to: number) => void;
  parentId?: number;
  visible?: boolean;
  nested?: NavItem[];
  isMain?: boolean;
}) {
  const [isNestedOpen, setIsNestedOpen] = useState(false);
  const [makeVisible, setMakeVisible] = useState(visible);
  const ref = useRef<HTMLLIElement | null>(null);

  const handleItemClick = (e: React.MouseEvent<HTMLElement>) => {
    e.stopPropagation();
    setIsNestedOpen((prev) => !prev);
  };

  const checkVisability = (status: boolean) => {
    setMakeVisible(status);
    handleVisability(id, status, parentId);
  };

  const [, drag] = useDrag({
    type: isMain ? "ITEM" : "SUB_ITEM",
    item: { id },
  });

  useEffect(() => {
    setMakeVisible(visible);
  }, [visible]);

  const [, drop] = useDrop({
    accept: isMain ? "ITEM" : "SUB_ITEM",
    hover: (draggedItem: { id: number }, monitor) => {
      if (!ref.current) return;
      const draggedID = draggedItem.id;
      const hoverID = id;
      if (draggedID === hoverID) return;

      const hoverBoundingRect = ref.current.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

      const clientOffset = monitor.getClientOffset() as { y: number };

      const hoverClientY = clientOffset.y - hoverBoundingRect.top;

      if (hoverClientY < hoverMiddleY) return;
      if (hoverClientY > hoverMiddleY) return;

      if (isMain) {
        moveItem(draggedID, hoverID);
      } else if (!isMain && moveSubItem && parentId) {
        moveSubItem(parentId, draggedID, hoverID);
      }

      draggedItem.id = hoverID;
    },
  });

  useEffect(() => {
    if (isSettingOpen && drag && drop && ref.current) {
      drag(drop(ref));
    }
  }, [drag, isSettingOpen]);

  return (
    <>
      <li
        ref={ref}
        className={`flex items-center justify-between cursor-pointer hover:bg-gray-100 ${
          isMain ? "bg-gray-100" : ""
        } ${!visible && !isSettingOpen ? "hidden" : ""}`}
        onClick={handleItemClick}
        onMouseDown={startPress}
        onMouseUp={stopPress}
        onMouseLeave={stopPress}
        onTouchStart={startPress}
        onTouchEnd={stopPress}
      >
        <Link
          href={"notifications"}
          onClick={(e) => e.stopPropagation()}
          className={`flex items-center gap-3 p-3 hover:bg-gray-200 rounded-md transition-all ${makeVisible ? "" : "text-gray-400"}`}
        >
          {isSettingOpen && <MdDragIndicator size={20} />}
          <span className="whitespace-nowrap">{text}</span>
        </Link>
        {isSettingOpen && (
          <div className="flex">
            <MdOutlineEdit size={20} />
            {makeVisible ? (
              <FaRegEye size={20} onClick={() => checkVisability(false)} />
            ) : (
              <FaRegEyeSlash size={20} onClick={() => checkVisability(true)} />
            )}
          </div>
        )}

        {nested?.length && !isSettingOpen && (
          <button className="p-2 cursor-pointer">
            {isNestedOpen ? "▲" : "▼"}
          </button>
        )}
      </li>
      {nested?.length && (isNestedOpen || isSettingOpen) && makeVisible && (
        <div className="pl-5">
          {nested.map((item) => (
            <SidebarItem
              key={item.id}
              id={item.id}
              parentId={id}
              text={item.title}
              visible={item.visible == false ? false : true}
              handleVisability={handleVisability}
              path={item.target}
              isSettingOpen={isSettingOpen}
              moveItem={moveItem}
              moveSubItem={moveSubItem}
              startPress={startPress}
              stopPress={stopPress}
            />
          ))}
        </div>
      )}
    </>
  );
}
