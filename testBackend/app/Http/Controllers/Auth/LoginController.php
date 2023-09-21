<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Str;
use App\Models\User;
class LoginController extends Controller
{
    public function register (Request $request) {
        $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:6|confirmed',
        ]);
        if ($validator->fails())
        {
            return response()->json([
                 'errors' => $validator->errors()->all(),
                'status' =>422,
            ],422);
        }
        $request['password']=Hash::make($request['password']);
        $request['remember_token'] = Str::random(10);
        $user = User::create($request->toArray());
        $token = $user->createToken($request->email)->accessToken;
        return response()->json([
            'token' => $token,
            'data' => $user,
            'status' =>200,

        ],200);
    }
    public function login (Request $request) {
        $validator = Validator::make($request->all(), [
            'email' => 'required|string|email|max:255',
            'password' => 'required|string|min:6',
        ]);
        if ($validator->fails())
        {
            return response()->json([
                'errors' => $validator->errors()->all(),
                'status' =>422,
            ],422);
        }
        $user = User::where('email', $request->email)->first();
        if ($user) {
            if (Hash::check($request->password, $user->password)) {
                $token = $user->createToken($request->email)->accessToken;
                return response()->json([
                    'token' => $token,
                    'data' => $user,
                    'status' =>200,
                ],200);
            } else {
                return response()->json([
                    "message" => ["Password mismatch"]
                ],422);
            }
        } else {
            return response()->json([
                "message" => ['User does not exist'],
                 'status' =>422,
            ],422);
        }
        
    }
    public function logout (Request $request) {
      
        $token = $request->user()->token();
        $token->revoke();
        return response()->json([
            "message" => ['You have been successfully logged out!'],
              'status' =>200,
        ],200);

    }
}
