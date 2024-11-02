<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Context;
use Spatie\Permission\Models\Permission;
use Spatie\Permission\Exceptions\RoleDoesNotExist;
use Spatie\Permission\Models\Role;

use function Laravel\Prompts\error;

class PermissionSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $permissions = [
            [   'name' => 'users.add',
                'roles' => [ 'Sistemas', 'Admin' ],
            ],
            [   'name' => 'users.get',
                'roles' => [ 'Sistemas', 'Admin' ]
            ],
            [   'name' => 'users.destroy',
                'roles' => [ 'Sistemas' ] ],
            [   'name' => 'users.edit',
                'roles' => [ 'Sistemas' ] ],
            


            [   'name' => 'tags.add',
                'roles' => [ 'Sistemas', 'Admin' ] 
            ],
            [   'name' => 'tags.get',
                'roles' => [ 'Sistemas', 'Admin' ]
            ],
            [   'name' => 'tags.destroy',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'tags.edit',
                'roles' => [ 'Sistemas' ]
            ],



            [   'name' => 'congresses.add',
                'roles' => [ 'Sistemas', 'Admin' ],
                'name' => 'congresses.get',
            ],
            [   'name' => 'congresses.destroy',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'congresses.edit',
                'roles' => [ 'Sistemas' ]
            ],


            [   'name' => 'academic-grades.add',
                'roles' => [ 'Sistemas', 'Admin' ],
            ],
             [   'name' => 'academic-grades.get',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'academic-grades.destroy',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'academic-grades.edit',
                'roles' => [ 'Sistemas' ]
            ],

            
            [   'name' => 'institutions.add',
                'roles' => [ 'Sistemas', 'Admin' ],
            ],
             [   'name' => 'institutions.get',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'institutions.destroy',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'institutions.edit',
                'roles' => [ 'Sistemas' ]
            ],


            [   'name' => 'publications.add',
                'roles' => [ 'Sistemas', 'Admin' ],
            ],
             [   'name' => 'publications.get',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'publications.destroy',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'publications.edit',
                'roles' => [ 'Sistemas' ]
            ],

            [   'name' => 'projects.add',
                'roles' => [ 'Sistemas', 'Admin' ],
            ],
             [   'name' => 'projects.get',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'projects.destroy',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'projects.edit',
                'roles' => [ 'Sistemas' ]
            ],



            [   'name' => 'courses.add',
                'roles' => [ 'Sistemas', 'Admin' ],
            ],
             [   'name' => 'courses.get',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'courses.destroy',
                'roles' => [ 'Sistemas' ]
            ],
            [   'name' => 'courses.edit',
                'roles' => [ 'Sistemas' ]
            ],






        ];
        $role_sistemas = Role::create(['name' => 'Sistemas', 
        // 'guard_name'=> 'api'
        ]);
        $role_admin = Role::create(['name' => 'Admin',
        //  'guard_name' => 'api'
        ]);

        foreach($permissions as $permission){
            $p = Permission::create([
                'name' => $permission['name'],
                // 'guard_name' => 'api'
            ]);

            foreach($permission['roles'] as $role){
                $p->assignRole($role);
            }
        }

        foreach(User::get() as $user){
            $user->assignRole($user->role_id);
        }
    

    }
}
