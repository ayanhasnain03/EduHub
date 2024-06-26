import { Button, VStack } from '@chakra-ui/react';
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  RiAddCircleFill,
  RiDashboardFill,
  RiEyeFill,
  RiUser3Fill,
} from 'react-icons/ri';
const SideBar = () => {
  const location = useLocation();
  return (
    <VStack spacing={'8'} p="16"     boxShadow={'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px;'}
    >
      <LinkButton text="Dashboard" Icon={RiDashboardFill} url={`dashboard`} active={location.pathname === "/admin/dashboard"} />
      <LinkButton
        text="Create Courses"
        Icon={RiAddCircleFill}
        url={`createcourse`}
        active={location.pathname === "/admin/createcourse"}
      />
      <LinkButton text="Courses" Icon={RiEyeFill} url={`courses`}
      active={location.pathname === "/admin/courses"}
      />
      <LinkButton text="Users" Icon={RiUser3Fill} url={`users`}
      active={location.pathname === "/admin/users"} />
    </VStack>
  );
};

export default SideBar;

function LinkButton({ url, Icon, text, active }) {
  return (
    <Link to={`/admin/${url}`}>
      <Button
        fontSize={'larger'}
        variant={'ghost'}
        colorScheme={active ? 'purple' : ''}
      >
        <Icon style={{ margin: '4px' }} />
        {text}
      </Button>
    </Link>
  );
}
