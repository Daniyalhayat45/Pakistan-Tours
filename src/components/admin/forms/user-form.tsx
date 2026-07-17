"use client";
import { createUser, updateUser } from "@/app/actions/admin";
import { EntityForm } from "@/components/admin/entity-form";
import { Field, FieldGrid } from "@/components/admin/field";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import type { User } from "@prisma/client";

export function UserForm({ user }: { user?: User }) {
  const isEdit = !!user;
  const action = isEdit ? (data: any) => updateUser(user!.id, data) : (data: any) => createUser(data);

  return (
    <EntityForm action={action} redirectTo="/admin/users" submitLabel={isEdit ? "Update User" : "Create User"}>
      <FieldGrid>
        <Field label="Name" name="name"><Input name="name" defaultValue={user?.name} required /></Field>
        <Field label="Email" name="email"><Input name="email" type="email" defaultValue={user?.email} required /></Field>
        <Field label={isEdit ? "New Password (leave blank to keep)" : "Password"} name="password">
          <Input name="password" type="password" minLength={6} required={!isEdit} />
        </Field>
        <Field label="Role" name="role">
          <Select name="role" defaultValue={user?.role ?? "EDITOR"}>
            <SelectTrigger><SelectValue /></SelectTrigger>
            <SelectContent>
              <SelectItem value="SUPER_ADMIN">Super Admin</SelectItem>
              <SelectItem value="ADMIN">Admin</SelectItem>
              <SelectItem value="EDITOR">Editor</SelectItem>
            </SelectContent>
          </Select>
        </Field>
      </FieldGrid>
      <Field label="Active"><div className="flex h-10 items-center"><Switch name="active" defaultChecked={user?.active ?? true} /></div></Field>
    </EntityForm>
  );
}
