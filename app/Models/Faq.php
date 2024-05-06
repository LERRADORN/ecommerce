<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Faq extends Model
{
    protected $fillable = ['question', 'answer']; // Only include fields in the fillable array

    // No need for category relationship in Faq model

}
