<?php

/**
 * Vercel Serverless Entry Point
 * Routes all incoming serverless requests to public/index.php
 */

// Normalize SCRIPT_NAME on Vercel so router and base_url never treat subpaths as subdirectories
$_SERVER['SCRIPT_NAME'] = '/index.php';

require_once dirname(__DIR__) . '/public/index.php';
